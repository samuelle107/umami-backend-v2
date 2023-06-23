import { Category } from "@prisma/client";

import { validateId } from "../../../utils";
import CategoryDAO from "../category.dao";
import { categoryCreateSchema } from "./category.schema";
import { CategoryCreate } from "./category.types";

export async function retrieveRecipeCategories(recipeId: string | undefined) {
  const recipeCategories = await CategoryDAO.retrieveRecipeCategories(
    validateId(recipeId)
  );

  return recipeCategories;
}

export async function createCategory(body: CategoryCreate) {
  await categoryCreateSchema.validate(body);

  const newCategory = categoryCreateSchema.cast(body, { stripUnknown: true });
  const category = await CategoryDAO.createCategory(newCategory);

  return category;
}

export async function createRecipeCategory(
  recipeId: string | undefined,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  const recipeCategory = await CategoryDAO.createRecipeCategory(
    validateId(recipeId),
    category
  );

  return recipeCategory;
}
