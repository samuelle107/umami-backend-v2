import { NextFunction, Request, Response } from "express";

import { Category } from "@prisma/client";
import prisma from "../../utils/client";
import { routeIds } from "../../utils/routes";

export async function getRecipeCategories(req: Request, res: Response) {
  const recipeId = Number(req.params[routeIds.recipe]);

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

/**
 * Middleware to create a category
 * @param req
 * @param res
 * @param next Sends the created/found category to the next function (addRecipeCategory)
 */
export async function addCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newCategoryName: string = req.body.category;

  try {
    const category = await prisma.category.upsert({
      where: {
        category: newCategoryName,
      },
      update: {},
      create: {
        category: newCategoryName,
      },
    });

    res.locals.category = category;
  } catch (err) {
    console.log(err);
  }

  next();
}

export async function addRecipeCategory(req: Request, res: Response) {
  const category: Category | undefined = res.locals.category;
  const recipeId = Number(req.params[routeIds.recipe]);

  try {
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

    res.send(recipeCategory);
  } catch (err) {
    console.log(err);
    res.send({
      message: "Unable to create category",
    });
  }
}
