package it.fabiodezuani.recipes.dto;

import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;


@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeDto {
    private Long id;
    private String name;
    private String description;
    private String userId;
    private Set<RecipeImageDto> images = new LinkedHashSet<>();
    private Set<StepDto> steps = new LinkedHashSet<>();
    private Set<RecipeRequirementDto> requirements = new LinkedHashSet<>();
    private Set<RecipeTagDto> recipeTags = new LinkedHashSet<>();
}
