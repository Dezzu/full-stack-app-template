package it.fabiodezuani.recipes.dto.response;

import it.fabiodezuani.recipes.exception.ValidationError;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static it.fabiodezuani.recipes.constant.ApplicationErrors.PARAMETRI_NON_VALIDI;


@NoArgsConstructor
@Data
public class ValidationResponse extends BaseResponse<Void> {
    private List<ValidationError> errors;

    public ValidationResponse(List<ValidationError> errors) {
        super(false, PARAMETRI_NON_VALIDI.getDescription(), PARAMETRI_NON_VALIDI.getDescriptionCode());
        this.errors = errors;
    }
}
