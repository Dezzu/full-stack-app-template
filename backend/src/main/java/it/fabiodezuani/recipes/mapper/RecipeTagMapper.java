package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.RecipeTagDto;
import it.fabiodezuani.recipes.model.RecipeTag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeTagMapper {

    RecipeTagDto toDto(RecipeTag entity);
    RecipeTag toEntity(RecipeTagDto dto);
    
}
