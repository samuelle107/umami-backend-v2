import { Prisma } from "@prisma/client";
import prisma from "../../utils/client";

export async function retrieveRecipes() {
  const recipes = await prisma.recipe.findMany();

  return recipes;
}

export async function retrieveRecipe(recipeId: number) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      recipeCategories: {
        select: {
          category: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
        },
      },
    },
  });

  return recipe;
}

export async function createRecipe(data: Prisma.RecipeCreateInput) {
  const recipe = await prisma.recipe.create({
    data,
  });

  return recipe;
}

export async function removeRecipe(recipeId: number) {
  const recipe = await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  return recipe;
}
