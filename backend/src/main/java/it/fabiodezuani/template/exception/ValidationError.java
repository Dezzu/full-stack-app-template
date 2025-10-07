package it.fabiodezuani.template.exception;

import it.fabiodezuani.template.constant.ErrorsInterface;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ValidationError {
    private String message;
    private String messageCode;
    private Boolean required;
    private Double min;
    private Double max;

    public static ValidationError required(ErrorsInterface message, Double min, Double max) {
        return new ValidationError(message.getDescription(), message.getDescriptionCode(), true, min, max);
    }

    public static ValidationError requiredZero(ErrorsInterface message) {
        return new ValidationError(message.getDescription(), message.getDescriptionCode(), null,0D,0D);
    }
}
