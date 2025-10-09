package it.fabiodezuani.recipes.util;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class DirectionSorting {

    public Sort.Direction direction(Integer sort) {
        return sort == 1 ? Sort.Direction.ASC : Sort.Direction.DESC;
    }

}
