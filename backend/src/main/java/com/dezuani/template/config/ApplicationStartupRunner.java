package com.dezuani.template.config;

import com.dezuani.template.model.Role;
import com.dezuani.template.repo.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Slf4j
public class ApplicationStartupRunner implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Value("${config.roles_to_create}")
    private String[] rolesToCreate;

    public ApplicationStartupRunner(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for(String roleName : rolesToCreate) {
            Optional<Role> byName = roleRepository.findByName(roleName);
            if(byName.isEmpty()) {
                roleRepository.save(new Role(roleName));
            }
        }
    }
}
