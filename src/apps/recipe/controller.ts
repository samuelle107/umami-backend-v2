import { Request, Response } from "express";
import {
  createRecipe,
  removeRecipe,
  retrieveRecipe,
  retrieveRecipes,
} from "./data";
import { Prisma } from "@prisma/client";

import { routeIds } from "../../utils/routes";

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
  const recipeId: number | undefined = Number(req.params[routeIds.recipe]);

  try {
    const recipe = await retrieveRecipe(recipeId);

    res.send(recipe);
  } catch (err) {
    res.status(404).send({
      message: `Recipe ${recipeId} not found`,
    });
  }
}

export async function postRecipe(req: Request, res: Response) {
  const data: Prisma.RecipeCreateInput = {
    imageUrl: req.body.image_url,
    name: req.body.name,
    srcUrl: req.body.src_url,
  };

  try {
    const recipe = await createRecipe(data);

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
  const id: number | undefined = Number(req.params[routeIds.recipe]);

  try {
    const recipe = await removeRecipe(id);

    res.send({
      message: `Successfully deleted recipe ${recipe.id}`,
    });
  } catch (err) {
    res.status(400).send({
      message: "Failed to delete recipe",
    });
  }
}
