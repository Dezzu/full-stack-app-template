package it.fabiodezuani.recipes.repo;

import it.fabiodezuani.recipes.model.RecipeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeImagesRepository extends JpaRepository<RecipeImage, Long>, JpaSpecificationExecutor<RecipeImage> {
}
