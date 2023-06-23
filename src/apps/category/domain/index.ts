import { Category } from "@prisma/client";

import { validateId } from "../../..//utils";
import categoryRepository from "../dataAccess";

export async function retrieveRecipeCategories(recipeId: string | undefined) {
  const parsedRecipeId = validateId(recipeId);

  const recipeCategories = await categoryRepository.retrieveRecipeCategories(
    parsedRecipeId
  );

  return recipeCategories;
}

export async function createCategory(categoryName: string) {
  return await categoryRepository.createCategory(categoryName);
}

export async function createRecipeCategory(
  recipeId: string | undefined,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  const parsedRecipeId = validateId(recipeId);

  const recipeCategory = await categoryRepository.createRecipeCategory(
    parsedRecipeId,
    category
  );

  return recipeCategory;
}
