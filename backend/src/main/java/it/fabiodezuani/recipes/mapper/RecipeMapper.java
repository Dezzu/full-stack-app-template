package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RecipeDto;
import it.fabiodezuani.recipes.model.Recipe;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    RecipeDto toDto(Recipe entity);
    Recipe toEntity(RecipeDto dto);
    
}
