package it.fabiodezuani.recipes.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipesController {

    @GetMapping
    public String getRecipes() {
        return "Recipes";
    }
}
