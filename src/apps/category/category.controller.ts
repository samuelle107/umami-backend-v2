import { Category } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { routeIds } from "src/utils/routes";

import {
  createCategory,
  createRecipeCategory,
  retrieveRecipeCategories,
} from "./service";

export async function getRecipeCategories(req: Request, res: Response) {
  try {
    const recipeCategories = await retrieveRecipeCategories(
      req.params[routeIds.recipe]
    );

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
export async function postCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newCategoryName: string = req.body.category;

  try {
    const category = await createCategory(newCategoryName);

    res.locals.category = category;
  } catch (err) {
    console.log(err);
  }

  next();
}

export async function getRecipeCategory(req: Request, res: Response) {
  const category: Category | undefined = res.locals.category;

  try {
    const recipeCategory = await createRecipeCategory(
      req.params[routeIds.recipe],
      category
    );

    res.send(recipeCategory);
  } catch (err) {
    console.log(err);
    res.send({
      message: "Unable to create category",
    });
  }
}
