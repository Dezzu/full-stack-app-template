package it.fabiodezuani.template.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Data
public class ValidationException extends RuntimeException {
    private final ArrayList<ValidationError> errors;
}
