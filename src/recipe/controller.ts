import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma-client";

export async function getRecipes(_req: Request, res: Response) {
  try {
    const recipes = await prisma.recipe.findMany();

    res.send(recipes);

    return;
  } catch (err) {
    console.log(err);
  }

  res.send({
    message: "Failed to retrieve all recipes",
  });
}

export async function getRecipe(req: Request, res: Response) {
  const { id }: { id?: string } = req.params;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (recipe) {
    res.send(recipe);

    return;
  }

  res.status(404).send({
    message: `Recipe ${id} not found`,
  });
}

export async function addRecipe(req: Request, res: Response) {
  const data: Prisma.recipeCreateInput = {
    image_url: req.body.image_url,
    name: req.body.name,
    src_url: req.body.src_url,
  };

  // TODO: Add schema validation here

  try {
    const recipe = await prisma.recipe.create({
      data,
    });

    if (recipe) {
      res.send(recipe);

      return;
    }
  } catch (err) {
    console.log(err);
  }

  res.status(400).send({
    message: "Failed to create recipe",
  });
}

export async function deleteRecipe(req: Request, res: Response) {
  const id: string | undefined = req.params.id;

  try {
    await prisma.recipe.delete({
      where: {
        id: Number(id),
      },
    });

    res.send({
      message: `Successfully deleted recipe ${id}`,
    });

    return;
  } catch (err) {
    console.log(err);
  }

  res.status(400).send({
    message: "Failed to delete recipe",
  });
}
