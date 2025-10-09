package it.fabiodezuani.recipes.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_images")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Recipe recipe;

    @Column(name = "\"order\"")
    private Integer order;

    @Column
    private Boolean cover;
}
