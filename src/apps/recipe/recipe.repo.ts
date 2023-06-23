import { Prisma } from "@prisma/client";

import prisma from "../../utils/client";

async function retrieveRecipes() {
  const recipes = await prisma.recipe.findMany();

  return recipes;
}

async function retrieveRecipe(recipeId: number) {
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

async function createRecipe(data: Prisma.RecipeCreateInput) {
  const recipe = await prisma.recipe.create({
    data,
  });

  return recipe;
}

async function removeRecipe(recipeId: number) {
  const recipe = await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  return recipe;
}

const RecipeRepo = {
  retrieveRecipe,
  retrieveRecipes,
  createRecipe,
  removeRecipe,
};

export default RecipeRepo;
