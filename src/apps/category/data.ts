import { Category } from "@prisma/client";
import prisma from "../../utils/client";

export async function getAllRecipeCategories(recipeId: number) {
  const recipeCategories = await prisma.recipeCategory.findMany({
    where: {
      recipeId: recipeId,
    },
  });

  return recipeCategories;
}

export async function addCategory(newCategory: string) {
  const category = await prisma.category.upsert({
    where: {
      category: newCategory,
    },
    update: {},
    create: {
      category: newCategory,
    },
  });

  return category;
}

export async function addRecipeCategory(
  recipeId: number,
  category: Category | undefined
) {
  if (!category) throw Error("No category found");

  // Create or update with nothing
  // Essentially create or do nothing if it exists already
  const recipeCategory = await prisma.recipeCategory.upsert({
    update: {},
    where: {
      recipeId_categoryId: {
        recipeId: recipeId,
        categoryId: category.id,
      },
    },
    create: {
      categoryId: category.id,
      recipeId: recipeId,
    },
  });

  return recipeCategory;
}
