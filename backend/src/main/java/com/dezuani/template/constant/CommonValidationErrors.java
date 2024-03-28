package com.dezuani.template.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum CommonValidationErrors implements ErrorsInterface {
    PARAMETERS_NOT_VALID(HttpStatus.BAD_REQUEST.value(), "Parameters not valid", "params.fields.invalid"),
    ;

    private final int code;
    private final String description;
    private final String descriptionCode;

}
