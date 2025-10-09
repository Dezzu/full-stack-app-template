package it.fabiodezuani.recipes.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_requirements")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ingredient", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Ingredient ingredient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_unit", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private RecipeRequirementsUnit unit;

    @Column
    private Double quantity;

    @Column(name = "\"order\"")
    private Integer order; // word reserved: quoted column
}
