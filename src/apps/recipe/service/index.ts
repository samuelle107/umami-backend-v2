import { Prisma } from '@prisma/client';

import { validateId } from '../../../utils';
import RecipeDAO from '../recipe.dao';
import recipeCreateSchema from './recipe.schema';
import { RecipeCreate } from './recipe.types';

export async function retrieveRecipes() {
  const recipes = await RecipeDAO.retrieveRecipes();

  return recipes;
}

export async function retrieveRecipe(recipeId: string | undefined) {
  const recipe = await RecipeDAO.retrieveRecipe(validateId(recipeId));

  return recipe;
}

export async function createRecipe(body: RecipeCreate) {
  await recipeCreateSchema.validate(body);

  const newRecipe = recipeCreateSchema.cast(body, { stripUnknown: true });
  const newRecipeWithUser: Prisma.RecipeCreateInput = {
    ...newRecipe,
    user: {
      connect: {
        id: 1,
      },
    },
  };
  const recipe = await RecipeDAO.createRecipe(newRecipeWithUser);

  return recipe;
}

export async function removeRecipe(recipeId: string | undefined) {
  const recipe = await RecipeDAO.removeRecipe(validateId(recipeId));

  return recipe.id;
}
