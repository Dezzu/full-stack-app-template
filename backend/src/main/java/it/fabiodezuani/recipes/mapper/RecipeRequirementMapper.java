package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RecipeRequirementDto;
import it.fabiodezuani.recipes.model.RecipeRequirement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeRequirementMapper {

    RecipeRequirementDto toDto(RecipeRequirement entity);
    RecipeRequirement toEntity(RecipeRequirementDto dto);
    
}
