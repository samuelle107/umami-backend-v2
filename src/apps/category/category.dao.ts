import { Category } from "@prisma/client";

import prisma from "../../utils/client";

async function retrieveRecipeCategories(recipeId: number) {
  const recipeCategories = await prisma.recipeCategory.findMany({
    where: {
      recipeId: recipeId,
    },
  });

  return recipeCategories;
}

async function createCategory(newCategory: string) {
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

async function createRecipeCategory(recipeId: number, category: Category) {
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

const CategoryDAO = {
  retrieveRecipeCategories,
  createCategory,
  createRecipeCategory,
};

export default CategoryDAO;
