import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import prisma from "../../utils/client";

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

// TODO: Look into optimizing this
export async function addRecipeCategory(req: Request, res: Response) {
  const newCategory: string = req.body.category;
  const recipeId = Number(req.params.id);

  try {
    const foundCategory = await prisma.category.findFirst({
      where: {
        category: {
          equals: newCategory,
        },
      },
    });

    const data: Prisma.RecipeCategoryCreateInput = {
      category: {
        connectOrCreate: {
          create: {
            category: newCategory,
          },
          where: {
            id: foundCategory?.id ?? undefined,
          },
        },
      },
      recipe: {
        connect: {
          id: recipeId,
        },
      },
    };

    const recipeCategory = await prisma.recipeCategory.create({
      data: data,
    });

    res.send(recipeCategory);
  } catch (err) {
    console.log(err);
    res.send();
  }
}
