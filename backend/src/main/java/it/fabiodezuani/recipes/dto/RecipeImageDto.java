package it.fabiodezuani.recipes.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeImageDto {
    private Long id;
    private String url;
    private Integer order;
    private Boolean cover;
}
