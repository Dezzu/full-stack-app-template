package it.fabiodezuani.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class TemplateApplicationMain {

	public static void main(String[] args) {
		SpringApplication.run(TemplateApplicationMain.class, args);
	}

}
