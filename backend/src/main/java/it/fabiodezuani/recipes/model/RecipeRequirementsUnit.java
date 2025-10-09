package it.fabiodezuani.recipes.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "recipe_requirements_units")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeRequirementsUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column
    private String name;

    @OneToMany(mappedBy = "unit")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<RecipeRequirement> requirements = new LinkedHashSet<>();
}
