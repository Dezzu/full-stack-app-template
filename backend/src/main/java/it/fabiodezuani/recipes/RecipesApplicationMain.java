package it.fabiodezuani.recipes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class RecipesApplicationMain {

	public static void main(String[] args) {
		SpringApplication.run(RecipesApplicationMain.class, args);
	}

}
