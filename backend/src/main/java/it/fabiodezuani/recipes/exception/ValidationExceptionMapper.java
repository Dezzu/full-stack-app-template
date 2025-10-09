package it.fabiodezuani.recipes.exception;

import it.fabiodezuani.recipes.dto.response.ValidationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import static it.fabiodezuani.recipes.constant.ApplicationErrors.PARAMETRI_NON_VALIDI;


@RestControllerAdvice
public class ValidationExceptionMapper {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ValidationResponse> handleException(ValidationException ex, WebRequest request) {
        return ResponseEntity.status(PARAMETRI_NON_VALIDI.getCode()).body(new ValidationResponse(ex.getErrors()));
    }

}
