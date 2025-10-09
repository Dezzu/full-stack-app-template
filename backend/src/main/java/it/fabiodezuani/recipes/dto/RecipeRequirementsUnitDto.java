package it.fabiodezuani.recipes.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeRequirementsUnitDto {
    private Long id;
    private String name;
}
