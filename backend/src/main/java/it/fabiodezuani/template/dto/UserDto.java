package it.fabiodezuani.template.dto;

import it.fabiodezuani.template.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String name;
    private String username;
    @JsonIgnore
    private String password;
    private String refreshToken;
    private Role roles;

}
