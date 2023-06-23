import { Category } from "@prisma/client";

import { validateId } from "../../../utils";
import CategoryDAO from "../category.dao";

export async function retrieveRecipeCategories(recipeId: string | undefined) {
  const parsedRecipeId = validateId(recipeId);

  const recipeCategories = await CategoryDAO.retrieveRecipeCategories(
    parsedRecipeId
  );

  return recipeCategories;
}

export async function createCategory(categoryName: string) {
  return await CategoryDAO.createCategory(categoryName);
}

export async function createRecipeCategory(
  recipeId: string | undefined,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  const parsedRecipeId = validateId(recipeId);

  const recipeCategory = await CategoryDAO.createRecipeCategory(
    parsedRecipeId,
    category
  );

  return recipeCategory;
}
