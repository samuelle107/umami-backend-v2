import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../utils/client";

export async function getRecipeRatings(req: Request, res: Response) {
  const recipeId: string | undefined = req.params.id;

  try {
    const ratings = await prisma.recipeRating.findMany({
      where: {
        recipeId: Number(recipeId),
      },
    });

    res.send(ratings);
  } catch (err) {
    res.status(404).send({
      message: `Could not find ratings for recipe ${recipeId}`,
    });
  }
}

export async function getRecipeRating(req: Request, res: Response) {
  const ratingId: string | undefined = req.params.ratingId;

  try {
    const rating = await prisma.recipeRating.findUnique({
      where: {
        id: Number(ratingId),
      },
    });

    res.send(rating);
  } catch (err) {
    res.status(404).send({
      message: `Could not find rating ${ratingId}`,
    });
  }
}

/**
 *
 * @param req
 * @param res
 * https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#update-or-create-a-related-record
 */
export async function addRecipeRating(req: Request, res: Response) {
  const data: Prisma.RecipeRatingCreateInput = {
    comment: req.body.comment,
    rating: req.body.rating,
    recipe: {
      connect: {
        id: Number(req.params.id),
      },
    },
  };

  try {
    const rating = await prisma.recipeRating.create({
      data,
    });

    res.send(rating);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not create rating",
    });
  }
}
