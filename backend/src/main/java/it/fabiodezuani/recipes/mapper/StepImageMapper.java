package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.StepImageDto;
import it.fabiodezuani.recipes.model.StepImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StepImageMapper {

    StepImageDto toDto(StepImage entity);
    StepImage toEntity(StepImageDto dto);
    
}
