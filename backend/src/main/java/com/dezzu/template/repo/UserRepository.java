package com.dezuani.template.repo;

import com.dezuani.template.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long>, JpaSpecificationExecutor<AppUser> {
    Optional<AppUser> findByUsername(String username);

    @Query("select u from AppUser u where u.username= :username and u.id != :userId")
    Optional<AppUser> findUsernameNotMe(String username, Long userId);
}
