package com.dezzu.template.controller;

import com.dezzu.template.dto.RoleDto;
import com.dezzu.template.dto.UserDto;
import com.dezzu.template.dto.request.PaginationRequest;
import com.dezzu.template.dto.request.RegistrationRequest;
import com.dezzu.template.dto.response.BaseResponse;
import com.dezzu.template.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/utenti")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<BaseResponse<Page<UserDto>>> getUsers(PaginationRequest paginationRequest) {
        Page<UserDto> users = userService.getUsers(paginationRequest);
        BaseResponse<Page<UserDto>> response = new BaseResponse<>(users);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<UserDto>> updateUser(@RequestBody RegistrationRequest request, @PathVariable Long id) {
        UserDto user = userService.updateUser(request, id);
        BaseResponse<UserDto> response = new BaseResponse<>(user);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/ruoli")
    public ResponseEntity<BaseResponse<RoleDto>> addRole(@RequestBody RoleDto role) {
        RoleDto roleDto = userService.saveRole(role);
        BaseResponse<RoleDto> response = new BaseResponse<>(roleDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/ruoli")
    public ResponseEntity<BaseResponse<List<RoleDto>>> getRoles() {
        List<RoleDto> roles = userService.getRoles();
        BaseResponse<List<RoleDto>> response = new BaseResponse<>(roles);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{username}/ruoli")
    public ResponseEntity<BaseResponse<RoleDto>> getUserRole(@PathVariable String username) {
        RoleDto roles = userService.getUserRole(username);
        BaseResponse<RoleDto> response = new BaseResponse<>(roles);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/{username}/ruoli/{roleName}")
    public ResponseEntity<BaseResponse<RoleDto>> addRoleToUser(@PathVariable String username, @PathVariable String roleName) {
        RoleDto role = userService.addRoleToUser(username, roleName);
        BaseResponse<RoleDto> response = new BaseResponse<>(role);
        return ResponseEntity.ok().body(response);
    }

}
