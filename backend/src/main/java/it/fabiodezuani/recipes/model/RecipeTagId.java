package it.fabiodezuani.recipes.model;

import lombok.*;

import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode
public class RecipeTagId implements Serializable {
    private Long idTag;
    private Long idRecipe;
}
