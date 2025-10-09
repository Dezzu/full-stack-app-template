package it.fabiodezuani.recipes.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeTagDto {
    private Long idTag;
    private Long idRecipe;
    private TagDto tag;
}
