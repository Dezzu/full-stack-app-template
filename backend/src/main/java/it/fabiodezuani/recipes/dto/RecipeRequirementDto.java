package it.fabiodezuani.recipes.dto;

import it.fabiodezuani.recipes.model.RecipeRequirementsUnit;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeRequirementDto {
    private Long id;
    private IngredientDto ingredient;
    private RecipeRequirementsUnit unit;
    private Double quantity;
    private Integer order;
}
