import { Category, RecipeCategory } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { routeIds } from "../../utils/routes";
import {
  createCategory,
  createRecipeCategory,
  retrieveRecipeCategories,
} from "./service";
import { CategoryCreate } from "./service/category.types";

export async function getRecipeCategories(
  req: Request<{
    [routeIds.recipe]: string;
  }>,
  res: Response
) {
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
  req: Request<undefined, undefined, CategoryCreate>,
  res: Response<void>,
  next: NextFunction
) {
  try {
    const category = await createCategory(req.body);

    res.locals.category = category;
  } catch (err) {
    console.log(err);
  }

  next();
}

export async function getRecipeCategory(
  req: Request<{
    [routeIds.recipe]: string;
  }>,
  res: Response<
    | RecipeCategory
    | {
        message: string;
      },
    {
      category?: Category;
    }
  >
) {
  const category = res.locals.category;

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
