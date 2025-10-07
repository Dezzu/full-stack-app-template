package it.fabiodezuani.template.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrors implements ErrorsInterface  {
    PARAMETRI_NON_VALIDI(HttpStatus.BAD_REQUEST.value(), "Errore nella validazione dei dati", "app.validation.invalid"),
    DATA_NON_VALIDA(HttpStatus.BAD_REQUEST.value(), "Data non valida", "app.validation.data")

    ;

    private final int code;
    private final String description;
    private final String descriptionCode;

}
