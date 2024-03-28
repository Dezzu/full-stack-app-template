package com.dezuani.template.dto.response;

import com.dezuani.template.constant.CommonValidationErrors;
import com.dezuani.template.exception.ValidationError;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class ValidationResponse extends BaseResponse<Void> {
    private List<ValidationError> errors;

    public ValidationResponse(List<ValidationError> errors) {
        super(false, CommonValidationErrors.PARAMETERS_NOT_VALID.getDescription(), CommonValidationErrors.PARAMETERS_NOT_VALID.getDescriptionCode());
        this.errors = errors;
    }
}
