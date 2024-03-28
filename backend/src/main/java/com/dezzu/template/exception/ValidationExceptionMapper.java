package com.dezzu.template.exception;

import com.dezzu.template.constant.CommonValidationErrors;
import com.dezzu.template.dto.response.ValidationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ValidationExceptionMapper {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ValidationResponse> handleException(ValidationException ex, WebRequest request) {
        return ResponseEntity.status(CommonValidationErrors.PARAMETERS_NOT_VALID.getCode()).body(new ValidationResponse(ex.getErrors()));
    }

}
