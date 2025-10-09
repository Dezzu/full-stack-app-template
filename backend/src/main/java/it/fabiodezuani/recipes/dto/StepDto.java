package it.fabiodezuani.recipes.dto;

import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class StepDto {
    private Long id;
    private Integer order;
    private String description;
    private Set<StepImageDto> images = new LinkedHashSet<>();
}
