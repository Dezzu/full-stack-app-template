package it.fabiodezuani.template.mapper;

import it.fabiodezuani.template.dto.RoleDto;
import it.fabiodezuani.template.model.Role;
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
