package it.fabiodezuani.recipes.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipes_tags")
@IdClass(RecipeTagId.class)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeTag {

    @Id
    @Column(name = "id_tag")
    @EqualsAndHashCode.Include
    private Long idTag;

    @Id
    @Column(name = "id_recipe")
    @EqualsAndHashCode.Include
    private Long idRecipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tag", insertable = false, updatable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe", insertable = false, updatable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Recipe recipe;
}
