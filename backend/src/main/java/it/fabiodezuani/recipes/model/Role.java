package it.fabiodezuani.recipes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(name="role_sequence", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="role_sequence")
    private Long id;
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
