import { Request, Response } from "express";
import { routeIds } from "src/utils/routes";

import {
  createRecipe,
  removeRecipe,
  retrieveRecipe,
  retrieveRecipes,
} from "./service";

export async function getRecipes(_req: Request, res: Response) {
  try {
    const recipes = await retrieveRecipes();

    res.send(recipes);
  } catch (err) {
    res.send({
      message: "Failed to retrieve all recipes",
    });
  }
}

export async function getRecipe(req: Request, res: Response) {
  const id = req.params[routeIds.recipe];

  try {
    const recipe = await retrieveRecipe(id);

    res.send(recipe);
  } catch (err) {
    res.status(404).send({
      message: `Recipe ${id} not found`,
    });
  }
}

export async function postRecipe(req: Request, res: Response) {
  try {
    const recipe = await createRecipe(req.body);

    if (recipe) {
      res.send(recipe);
    }
  } catch (err) {
    res.status(400).send({
      message: "Failed to create recipe",
    });
  }
}

export async function deleteRecipe(req: Request, res: Response) {
  try {
    const recipeId = await removeRecipe(req.params[routeIds.recipe]);

    res.send({
      message: `Successfully deleted recipe ${recipeId}`,
    });
  } catch (err) {
    res.status(400).send({
      message: "Failed to delete recipe",
    });
  }
}
