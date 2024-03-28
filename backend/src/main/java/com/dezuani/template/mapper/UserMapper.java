package com.dezuani.template.mapper;

import com.dezuani.template.dto.UserDto;
import com.dezuani.template.model.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDto toDto(AppUser user) {
        return UserDto.builder()
                .username(user.getUsername())
                .id(user.getId())
                .roles(user.getRole())
                .refreshToken(user.getRefreshToken())
                .name(user.getName())
                .build();
    }
    public UserDto toDtoSmall(AppUser user) {
        return UserDto.builder()
                .username(user.getUsername())
                .id(user.getId())
                .name(user.getName())
                .build();
    }

    public AppUser toEntity(UserDto user) {
        return AppUser.builder()
                .id(user.getId())
                .build();
    }

}
