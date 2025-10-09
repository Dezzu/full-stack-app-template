package it.fabiodezuani.recipes.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BaseResponse<T> {
    private Boolean success = true;
    private String message;
    private String messageCode;
    private T data;

    public BaseResponse(T data) {
        this.data = data;
    }

    public BaseResponse(Boolean success, String message, String messageCode) {
        this.success = success;
        this.message = message;
        this.messageCode = messageCode;
    }
}
