import { NextFunction, Request, Response } from "express";
import {
  createCategory,
  createRecipeCategory,
  retrieveRecipeCategories,
} from "./data";
import { Category } from "@prisma/client";
import { routeIds } from "../../utils/routes";

export async function getRecipeCategories(req: Request, res: Response) {
  const recipeId = Number(req.params[routeIds.recipe]);

  try {
    const recipeCategories = await retrieveRecipeCategories(recipeId);

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
  const recipeId = Number(req.params[routeIds.recipe]);

  try {
    if (!category) throw Error("No category found");

    const recipeCategory = await createRecipeCategory(recipeId, category);

    res.send(recipeCategory);
  } catch (err) {
    console.log(err);
    res.send({
      message: "Unable to create category",
    });
  }
}
