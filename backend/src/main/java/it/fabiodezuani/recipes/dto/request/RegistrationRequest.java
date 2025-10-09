package it.fabiodezuani.recipes.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {
    private String name;
    private String username;
    private String password;
    private Long role;
}
