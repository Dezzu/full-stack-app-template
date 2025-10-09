package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.IngredientDto;
import it.fabiodezuani.recipes.model.Ingredient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    IngredientDto toDto(Ingredient ingredient);
    Ingredient toEntity(IngredientDto ingredientDto);

}
