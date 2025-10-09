package it.fabiodezuani.recipes.exception;

import it.fabiodezuani.recipes.dto.response.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ApplicationExceptionMapper {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<BaseResponse<Object>> handleException(ApplicationException ex, WebRequest request) {
        return ResponseEntity.status(ex.getCode()).body(new BaseResponse<>(false, ex.getDescription(), ex.getDescriptionCode()));
    }

}
