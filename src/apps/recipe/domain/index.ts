import { Prisma } from "@prisma/client";

import { validateId } from "../../..//utils";
import RecipeService from "../recipe.service";

export async function retrieveRecipes() {
  const recipes = await RecipeService.retrieveRecipes();

  return recipes;
}

export async function retrieveRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeService.retrieveRecipe(validatedRecipeId);

  return recipe;
}

export async function createRecipe(body: Record<string, any>) {
  const data: Prisma.RecipeCreateInput = {
    imageUrl: body.imageUrl,
    name: body.name,
    srcUrl: body.srcUrl,
  };

  const recipe = await RecipeService.createRecipe(data);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeService.removeRecipe(validatedRecipeId);

  return recipe;
}
