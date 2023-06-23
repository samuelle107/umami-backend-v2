import { Prisma } from "@prisma/client";
import { validateId } from "src/utils";

import RecipeDAO from "../recipe.dao";
import recipeCreateSchema from "./recipe.schema";

export async function retrieveRecipes() {
  const recipes = await RecipeDAO.retrieveRecipes();

  return recipes;
}

export async function retrieveRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeDAO.retrieveRecipe(validatedRecipeId);

  return recipe;
}

export async function createRecipe(body: Record<string, any>) {
  const newRecipe: Prisma.RecipeCreateInput = {
    imageUrl: body.imageUrl,
    name: body.name,
    srcUrl: body.srcUrl,
  };

  await recipeCreateSchema.validate(newRecipe);

  const recipe = await RecipeDAO.createRecipe(newRecipe);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeDAO.removeRecipe(validatedRecipeId);

  return recipe.id;
}
