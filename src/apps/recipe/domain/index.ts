import { Prisma } from "@prisma/client";

import { validateId } from "../../..//utils";
import recipeRepository from "../dataAccess";

export async function retrieveRecipes() {
  const recipes = await recipeRepository.retrieveRecipes();

  return recipes;
}

export async function retrieveRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await recipeRepository.retrieveRecipe(validatedRecipeId);

  return recipe;
}

export async function createRecipe(body: Record<string, any>) {
  const data: Prisma.RecipeCreateInput = {
    imageUrl: body.image_url,
    name: body.name,
    srcUrl: body.src_url,
  };

  const recipe = await recipeRepository.createRecipe(data);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await recipeRepository.removeRecipe(validatedRecipeId);

  return recipe;
}
