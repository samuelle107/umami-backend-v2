import { Category } from "@prisma/client";

import { validateId } from "../../..//utils";
import categoryService from "../category.service";

export async function retrieveRecipeCategories(recipeId: string | undefined) {
  const parsedRecipeId = validateId(recipeId);

  const recipeCategories = await categoryService.retrieveRecipeCategories(
    parsedRecipeId
  );

  return recipeCategories;
}

export async function createCategory(categoryName: string) {
  return await categoryService.createCategory(categoryName);
}

export async function createRecipeCategory(
  recipeId: string | undefined,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  const parsedRecipeId = validateId(recipeId);

  const recipeCategory = await categoryService.createRecipeCategory(
    parsedRecipeId,
    category
  );

  return recipeCategory;
}
