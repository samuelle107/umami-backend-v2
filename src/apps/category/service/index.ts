import { Category } from "@prisma/client";

import { validateId } from "../../../utils";
import CategoryRepo from "../category.repo";

export async function retrieveRecipeCategories(recipeId: string | undefined) {
  const parsedRecipeId = validateId(recipeId);

  const recipeCategories = await CategoryRepo.retrieveRecipeCategories(
    parsedRecipeId
  );

  return recipeCategories;
}

export async function createCategory(categoryName: string) {
  return await CategoryRepo.createCategory(categoryName);
}

export async function createRecipeCategory(
  recipeId: string | undefined,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  const parsedRecipeId = validateId(recipeId);

  const recipeCategory = await CategoryRepo.createRecipeCategory(
    parsedRecipeId,
    category
  );

  return recipeCategory;
}
