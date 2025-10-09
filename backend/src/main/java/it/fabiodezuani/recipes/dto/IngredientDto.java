package it.fabiodezuani.recipes.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IngredientDto {
    private Long id;
    private String name;
    private String description;
    private String userId;
}
