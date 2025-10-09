package it.fabiodezuani.recipes.dto;

import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TagDto {
    private Long id;
    private String name;
    private String userId;
    private Set<RecipeTagDto> recipeTags = new LinkedHashSet<>();
}
