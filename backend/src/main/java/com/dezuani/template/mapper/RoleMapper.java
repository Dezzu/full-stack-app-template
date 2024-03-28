package com.dezuani.template.mapper;

import com.dezuani.template.dto.RoleDto;
import com.dezuani.template.model.Role;
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
