import { Request, Response } from "express";
import {
  createPostReview,
  retrieveRecipeReview,
  retrieveRecipeReviews,
} from "./data";
import { Prisma } from "@prisma/client";
import { routeIds } from "../../utils/routes";

export async function getRecipeReviews(req: Request, res: Response) {
  const recipeId: number | undefined = Number(req.params[routeIds.recipe]);

  try {
    const reviews = await retrieveRecipeReviews(recipeId);

    res.send(reviews);
  } catch (err) {
    res.status(404).send({
      message: `Could not find reviews for recipe ${recipeId}`,
    });
  }
}

export async function getRecipeReview(req: Request, res: Response) {
  const reviewId: number | undefined = Number(req.params[routeIds.review]);

  try {
    const review = await retrieveRecipeReview(reviewId);

    res.send(review);
  } catch (err) {
    res.status(404).send({
      message: `Could not find review ${reviewId}`,
    });
  }
}

/**
 *
 * @param req
 * @param res
 * https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#update-or-create-a-related-record
 */
export async function postRecipeReview(req: Request, res: Response) {
  const recipeId = Number(req.params[routeIds.recipe]);

  const data: Prisma.ReviewCreateInput = {
    comment: req.body.comment,
    rating: req.body.rating,
    recipe: {
      connect: {
        id: recipeId,
      },
    },
  };

  try {
    const review = await createPostReview(data);

    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not create review",
    });
  }
}
