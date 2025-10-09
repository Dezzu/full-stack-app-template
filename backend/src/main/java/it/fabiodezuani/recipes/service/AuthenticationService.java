package it.fabiodezuani.recipes.service;

import it.fabiodezuani.recipes.constant.UtentiErrors;
import it.fabiodezuani.recipes.dto.UserDto;
import it.fabiodezuani.recipes.dto.request.JwtRequest;
import it.fabiodezuani.recipes.dto.request.RefreshTokenRequest;
import it.fabiodezuani.recipes.dto.request.RegistrationRequest;
import it.fabiodezuani.recipes.dto.request.ValidationTokenRequest;
import it.fabiodezuani.recipes.dto.response.JwtResponse;
import it.fabiodezuani.recipes.dto.response.ValidationTokenResponse;
import it.fabiodezuani.recipes.exception.ApplicationException;
import it.fabiodezuani.recipes.mapper.UserMapper;
import it.fabiodezuani.recipes.model.AppUser;
import it.fabiodezuani.recipes.model.Role;
import it.fabiodezuani.recipes.repo.RoleRepository;
import it.fabiodezuani.recipes.repo.UserRepository;
import it.fabiodezuani.recipes.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleRepository roleRepo;

    public JwtResponse login(JwtRequest request) {
        log.info("Generating token for user {}", request.getUsername());
        AppUser user;
//        TODO add validation
        try {
            user = (AppUser) authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())).getPrincipal();
        } catch (BadCredentialsException e) {
            throw new ApplicationException(UtentiErrors.CREDENTIALS_NOT_VALID);
        }
        JwtResponse response = createJwtResponse(request.getUsername(), user);
        user.setRefreshToken(response.getRefreshToken());
        return response;
    }

    public JwtResponse refreshToken(RefreshTokenRequest request) {
        AppUser user = userRepo.findByUsername(request.getUsername()).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT));
        log.info("Found user {} in the database", request.getUsername());

        if (!user.getRefreshToken().equals(request.getRefreshToken()))
            throw new ApplicationException(UtentiErrors.REFRESH_TOKEN_MISMATCH);

        try {
            log.info("Validating {}'s refresh token", request.getUsername());
            jwtUtil.validateToken(request.getRefreshToken(), user, true);
        } catch (Exception e) {
            throw new ApplicationException(UtentiErrors.REFRESH_TOKEN_NOT_VALID);
        }
        JwtResponse response = createJwtResponse(request.getUsername(), user);
        user.setRefreshToken(response.getRefreshToken());
        return response;
    }

    public UserDto register(RegistrationRequest request) {
        Optional<AppUser> byUsername = userRepo.findByUsername(request.getUsername());

        if(byUsername.isPresent())
            throw new ApplicationException(UtentiErrors.USERNAME_ALREADY_TAKEN);

        Role userRole = roleRepo.findByName("UTENTE").orElseThrow(() -> new ApplicationException(UtentiErrors.USER_ROLE_NOT_PRESENT));
        Role role = request.getRole() == null ? userRole : roleRepo.findById(request.getRole()).orElse(userRole);

        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(role);
        return userMapper.toDto(userRepo.save(user));
    }

    public ValidationTokenResponse validateToken(ValidationTokenRequest request) {
        ValidationTokenResponse response = new ValidationTokenResponse();
        String username;
        AppUser user;
        try {
            username = jwtUtil.extractUsername(request.getToken(), request.getRefresh());
            user = userRepo.findByUsername(username).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_NON_PRESENT));
            jwtUtil.validateToken(request.getToken(), user, request.getRefresh());
        } catch (Exception e) {
            response.setValid(false);
            return response;
        }
        response.setUsername(username);
        response.setUserId(user.getId());
        response.setValid(true);
        return response;
    }

    private JwtResponse createJwtResponse(String username, AppUser user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole().getName());
        claims.put("username", user.getUsername());
        return JwtResponse.builder()
                .accessToken(jwtUtil.generateAccessToken(username, claims))
                .refreshToken(jwtUtil.createRefreshToken(username))
                .build();
    }
}
