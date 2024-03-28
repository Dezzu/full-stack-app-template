package com.dezzu.template.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UtentiErrors implements ErrorsInterface {
    USER_ROLE_NOT_PRESENT(HttpStatus.BAD_REQUEST.value(), "User or role not present, check the request", "auth.userRole.invalid"),
    USER_NON_PRESENT(HttpStatus.BAD_REQUEST.value(), "User not present", "auth.user.userNotPresent"),
    USERNAME_ALREADY_TAKEN(HttpStatus.BAD_REQUEST.value(), "Username già utilizzato", "auth.user.usernameTaken"),

    CREDENTIALS_NOT_VALID(HttpStatus.UNAUTHORIZED.value(), "Credentials not valid", "auth.user.invalidCredentials"),
    REFRESH_TOKEN_NOT_VALID(HttpStatus.UNAUTHORIZED.value(), "Refresh Token not valid", "auth.user.invalidRefresh"),
    REFRESH_TOKEN_MISMATCH(HttpStatus.BAD_REQUEST.value(), "Refresh Tokens don't match", "auth.user.refreshDontMatch"),
    TECNICO_NOT_PRESENT(HttpStatus.BAD_REQUEST.value(), "Il tecnico selezionato non esiste", "auth.user.tecnicoNonPresente")
    ;

    private final int code;
    private final String description;
    private final String descriptionCode;

}
