package com.dezzu.template.exception;

import com.dezzu.template.constant.ErrorsInterface;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ApplicationException extends RuntimeException {
    private int code;
    private String description;
    private String descriptionCode;

    public ApplicationException(ErrorsInterface error) {
        this.code = error.getCode();
        this.description = error.getDescription();
        this.descriptionCode = error.getDescriptionCode();
    }
}
