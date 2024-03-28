package com.dezzu.template.mapper;

import com.dezzu.template.dto.RoleDto;
import com.dezzu.template.model.Role;
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
