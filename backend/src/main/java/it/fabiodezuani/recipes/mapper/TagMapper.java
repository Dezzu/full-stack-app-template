package it.fabiodezuani.recipes.mapper;

import it.fabiodezuani.recipes.dto.TagDto;
import it.fabiodezuani.recipes.model.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {

    TagDto toDto(Tag entity);
    Tag toEntity(TagDto dto);
    
}
