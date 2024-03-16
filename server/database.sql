CREATE DATABASE recipepern;

-- SERIAL ta uniqueness rakhar jnno primary key er value increase kore
CREATE TABLE recipe(
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(200),
    rating integer, 
    description VARCHAR(800)
);