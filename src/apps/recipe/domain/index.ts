import { Prisma } from "@prisma/client";

import { validateId } from "../../..//utils";
import RecipeService from "../recipe.service";
import recipeCreateSchema from "./recipe.schema";

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
  const newRecipe: Prisma.RecipeCreateInput = {
    imageUrl: body.imageUrl,
    name: body.name,
    srcUrl: body.srcUrl,
  };

  await recipeCreateSchema.validate(newRecipe);

  const recipe = await RecipeService.createRecipe(newRecipe);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeService.removeRecipe(validatedRecipeId);

  return recipe.id;
}
