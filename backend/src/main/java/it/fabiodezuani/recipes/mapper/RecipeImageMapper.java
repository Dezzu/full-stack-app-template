package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RecipeImageDto;
import it.fabiodezuani.recipes.model.RecipeImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeImageMapper {

    RecipeImageDto toDto(RecipeImage entity);
    RecipeImage toEntity(RecipeImageDto dto);
    
}
