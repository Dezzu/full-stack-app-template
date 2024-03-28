package com.dezuani.template.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum CommonErrors implements ErrorsInterface {
    DATE_NOT_VALID(HttpStatus.BAD_REQUEST.value(), "Date not valid", "params.date.invalid"),
    ;

    private final int code;
    private final String description;
    private final String descriptionCode;

}
