package it.fabiodezuani.recipes.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String userId;

    @OneToMany(mappedBy = "ingredient")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<RecipeRequirement> requirements = new LinkedHashSet<>();
}
