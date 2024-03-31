package com.dezzu.template.service;

import com.dezzu.template.constant.UtentiErrors;
import com.dezzu.template.dto.RoleDto;
import com.dezzu.template.dto.UserDto;
import com.dezzu.template.dto.request.PaginationRequest;
import com.dezzu.template.dto.request.RegistrationRequest;
import com.dezzu.template.exception.ApplicationException;
import com.dezzu.template.mapper.RoleMapper;
import com.dezzu.template.mapper.UserMapper;
import com.dezzu.template.model.AppUser;
import com.dezzu.template.model.Role;
import com.dezzu.template.repo.RoleRepository;
import com.dezzu.template.repo.UserRepository;
import com.dezzu.template.util.DirectionSorting;
import com.turkraft.springfilter.FilterBuilder;
import com.turkraft.springfilter.boot.FilterSpecification;
import com.turkraft.springfilter.parser.Filter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final UserMapper userAssembler;
    private final RoleMapper roleAssembler;
    private final DirectionSorting sorting;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT));
    }

    public UserDto updateUser(RegistrationRequest request, Long id) {
        log.info("Aggiornando l'utente {}", id);
        Optional<AppUser> usernameNotMe = userRepo.findUsernameNotMe(request.getUsername(), id);
        if(usernameNotMe.isPresent())
            throw new ApplicationException(UtentiErrors.USERNAME_ALREADY_TAKEN);

        AppUser appUser = userRepo.findById(id).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT));
        Role userRole = roleRepo.findByName("UTENTE").orElseThrow(() -> new ApplicationException(UtentiErrors.USER_ROLE_NOT_PRESENT));
        Role role = roleRepo.findById(request.getRole()).orElse(userRole);

        appUser.setName(request.getName());
        if(request.getPassword() != null)
            appUser.setPassword(request.getPassword());
        appUser.setUsername(request.getUsername());
        appUser.setRole(role);
        AppUser saved = userRepo.save(appUser);
        return userAssembler.toDto(saved);
    }

    public RoleDto saveRole(RoleDto role) {
        log.info("Role - {} - is being added", role.getRoleName());
        Role savedRole = roleRepo.save(new Role(role.getRoleId(), role.getRoleName()));
        return roleAssembler.toDto(savedRole);
    }

    public RoleDto addRoleToUser(String username, String roleName) {
        log.info("Trying to add role - {} - to user - {}", roleName, username);
        AppUser user = userRepo.findByUsername(username).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_ROLE_NOT_PRESENT));
        Role role = roleRepo.findByName(roleName).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_ROLE_NOT_PRESENT));

        user.setRole(role);
        userRepo.save(user);
        return roleAssembler.toDto(role);
    }

    public RoleDto getUserRole(String username) {
        return roleAssembler.toDto(userRepo.findByUsername(username).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT)).getRole());
    }

    public List<RoleDto> getRoles() {
        return roleRepo.findAll().stream().map(roleAssembler::toDto).collect(Collectors.toList());
    }

    public UserDto getUser(String username) {
        log.info("Getting user - {}", username);
        AppUser user = userRepo.findByUsername(username).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT));
        return userAssembler.toDto(user);
    }

    public Page<UserDto> getUsers(PaginationRequest paginationRequest) {
        log.info("Getting all users");
        Sort sort = null;
        if(paginationRequest.getSortField() == null) {
            sort = Sort.by(Sort.Direction.DESC, "id");
        } else {
            sort = Sort.by(sorting.direction(paginationRequest.getSortOrder()), paginationRequest.getSortField());
        }
        ArrayList<Filter> filters = new ArrayList<>();

        String query = paginationRequest.getQuery();
        if(query != null) {
            filters.add(FilterBuilder.or(
                    FilterBuilder.like("name", "%" + query + "%"),
                    FilterBuilder.like("username", "%" + query + "%"),
                    FilterBuilder.like("id", "%" + query + "%")
            ));
        }

        FilterSpecification<AppUser> spec = !filters.isEmpty() ? new FilterSpecification<>(FilterBuilder.and(filters)) : null;
        Page<AppUser> all = userRepo.findAll(spec, PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize(), sort));
        return all.map(userAssembler::toDto);
    }

}
