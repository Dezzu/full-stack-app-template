package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RecipeRequirementsUnitDto;
import it.fabiodezuani.recipes.model.RecipeRequirementsUnit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeRequirementUnitMapper {

    RecipeRequirementsUnitDto toDto(RecipeRequirementsUnit entity);
    RecipeRequirementsUnit toEntity(RecipeRequirementsUnitDto dto);
    
}
