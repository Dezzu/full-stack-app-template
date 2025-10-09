package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.StepDto;
import it.fabiodezuani.recipes.model.Step;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StepMapper {

    StepDto toDto(Step entity);
    Step toEntity(StepDto dto);
    
}
