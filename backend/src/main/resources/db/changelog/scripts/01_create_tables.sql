CREATE TABLE "recipes" (
   "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- sequence implicita
   "name" text,
   "description" text,
   "user_id" text
);

CREATE TABLE "recipe_requirements_units" (
   "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" text
);

CREATE TABLE "ingredients" (
   "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" text,
   "description" text,
   "user_id" text
);

CREATE TABLE "tags" (
    "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text,
    "user_id" text
);

CREATE TABLE "recipes_tags" (
   "id_tag" bigint,
   "id_recipe" bigint,
   PRIMARY KEY ("id_tag","id_recipe"),
   CONSTRAINT "fk_recipe_tags_recipe"
       FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id"),
   CONSTRAINT "fk_recipe_tags_tag"
       FOREIGN KEY ("id_tag") REFERENCES "tags" ("id")
);

CREATE TABLE "recipe_images" (
    "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "url" text,
    "id_recipe" bigint,
    "order" integer,
    "cover" boolean,
    CONSTRAINT "fk_recipe_images_recipe"
        FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id")
);

CREATE TABLE "steps" (
     "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     "order" integer,
     "id_recipe" bigint,
     "description" text,
     CONSTRAINT "fk_steps_recipe"
         FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id")
);

CREATE TABLE "step_images" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "url" text,
  "id_step" bigint,
  "order" integer,
  "cover" boolean,
  CONSTRAINT "fk_step_images_step"
      FOREIGN KEY ("id_step") REFERENCES "steps" ("id")
);

CREATE TABLE "recipe_requirements" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "id_recipe" bigint,
  "id_ingredient" bigint,
  "id_unit" bigint,
  "quantity" double precision,
  "order" integer,
  CONSTRAINT "fk_req_recipe"
      FOREIGN KEY ("id_recipe") REFERENCES "recipes" ("id"),
  CONSTRAINT "fk_req_ingredient"
      FOREIGN KEY ("id_ingredient") REFERENCES "ingredients" ("id"),
  CONSTRAINT "fk_req_unit"
      FOREIGN KEY ("id_unit") REFERENCES "recipe_requirements_units" ("id")
);
