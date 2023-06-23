import { Prisma } from "@prisma/client";

import { validateId } from "../../../utils";
import RecipeRepo from "../recipe.repo";
import recipeCreateSchema from "./recipe.schema";

export async function retrieveRecipes() {
  const recipes = await RecipeRepo.retrieveRecipes();

  return recipes;
}

export async function retrieveRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeRepo.retrieveRecipe(validatedRecipeId);

  return recipe;
}

export async function createRecipe(body: Record<string, any>) {
  const newRecipe: Prisma.RecipeCreateInput = {
    imageUrl: body.imageUrl,
    name: body.name,
    srcUrl: body.srcUrl,
  };

  await recipeCreateSchema.validate(newRecipe);

  const recipe = await RecipeRepo.createRecipe(newRecipe);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const validatedRecipeId = validateId(recipeId);
  const recipe = await RecipeRepo.removeRecipe(validatedRecipeId);

  return recipe.id;
}
