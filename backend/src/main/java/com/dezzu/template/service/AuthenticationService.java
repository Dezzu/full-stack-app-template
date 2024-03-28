package com.dezuani.template.service;

import com.dezuani.template.constant.UtentiErrors;
import com.dezuani.template.dto.UserDto;
import com.dezuani.template.dto.request.JwtRequest;
import com.dezuani.template.dto.request.RefreshTokenRequest;
import com.dezuani.template.dto.request.RegistrationRequest;
import com.dezuani.template.dto.request.ValidationTokenRequest;
import com.dezuani.template.dto.response.JwtResponse;
import com.dezuani.template.dto.response.ValidationTokenResponse;
import com.dezuani.template.exception.ApplicationException;
import com.dezuani.template.mapper.UserMapper;
import com.dezuani.template.model.AppUser;
import com.dezuani.template.model.Role;
import com.dezuani.template.repo.RoleRepository;
import com.dezuani.template.repo.UserRepository;
import com.dezuani.template.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    @Value("${config.default_user}")
    private String defaultUser;

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

        Role userRole = roleRepo.findByName(defaultUser).orElseThrow(() -> new ApplicationException(UtentiErrors.USER_ROLE_NOT_PRESENT));
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
