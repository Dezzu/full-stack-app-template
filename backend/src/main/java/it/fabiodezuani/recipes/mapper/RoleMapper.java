package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RoleDto;
import it.fabiodezuani.recipes.model.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

    public RoleDto toDto(Role role) {
        return RoleDto.builder()
                .roleId(role.getId())
                .roleName(role.getName())
                .build();
    }

}
