package it.fabiodezuani.recipes.controller;

import it.fabiodezuani.recipes.dto.IngredientDto;
import it.fabiodezuani.recipes.mapper.IngredientMapper;
import it.fabiodezuani.recipes.repo.IngredientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@RequiredArgsConstructor
public class RecipesController {

    private final IngredientRepository repository;
    private final IngredientMapper mapper;

    @GetMapping
    @Transactional
    public List<IngredientDto> getRecipes() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
