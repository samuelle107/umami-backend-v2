import { Request, Response } from "express";

import prisma from "../../utils/client";

export async function findOrCreateCategory(categoryName: string) {
  try {
    const category = await prisma.category.upsert({
      where: {
        category: categoryName,
      },
      update: {},
      create: {
        category: categoryName,
      },
    });

    return category;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getRecipeCategories(req: Request, res: Response) {
  const recipeId = Number(req.params.id);

  try {
    const recipeCategories = await prisma.recipeCategory.findMany({
      where: {
        recipeId: recipeId,
      },
    });

    res.send(recipeCategories);
  } catch (err) {
    res.send();
  }
}

export async function addRecipeCategory(req: Request, res: Response) {
  const newCategoryName: string = req.body.category;
  const recipeId = Number(req.params.id);

  try {
    const category = await findOrCreateCategory(newCategoryName);

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

    res.send(recipeCategory);
  } catch (err) {
    console.log(err);
    res.send({
      message: "Unable to create category",
    });
  }
}
