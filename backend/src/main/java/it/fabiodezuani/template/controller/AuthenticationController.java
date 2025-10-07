package it.fabiodezuani.template.controller;

import it.fabiodezuani.template.dto.UserDto;
import it.fabiodezuani.template.dto.request.JwtRequest;
import it.fabiodezuani.template.dto.request.RefreshTokenRequest;
import it.fabiodezuani.template.dto.request.RegistrationRequest;
import it.fabiodezuani.template.dto.request.ValidationTokenRequest;
import it.fabiodezuani.template.dto.response.BaseResponse;
import it.fabiodezuani.template.dto.response.JwtResponse;
import it.fabiodezuani.template.dto.response.ValidationTokenResponse;
import it.fabiodezuani.template.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authenticate")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<BaseResponse<JwtResponse>> login(@RequestBody JwtRequest request) {
        JwtResponse login = authenticationService.login(request);
        BaseResponse<JwtResponse> response = new BaseResponse<>(login);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<BaseResponse<JwtResponse>> refreshToken(@RequestBody RefreshTokenRequest request) {
        JwtResponse jwtResponse = authenticationService.refreshToken(request);
        BaseResponse<JwtResponse> response = new BaseResponse<>(jwtResponse);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<BaseResponse<UserDto>> register(@RequestBody RegistrationRequest request) {
        UserDto register = authenticationService.register(request);
        BaseResponse<UserDto> response = new BaseResponse<>(register);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidationTokenResponse> validateToken(@RequestBody ValidationTokenRequest request) {
        return ResponseEntity.ok().body(authenticationService.validateToken(request));
    }

}
