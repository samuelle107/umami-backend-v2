import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { routeIds } from "../../utils/routes";
import {
  createRecipeReview,
  retrieveRecipeReview,
  retrieveRecipeReviews,
} from "./service";

export async function getRecipeReviews(
  req: Request<{ [routeIds.recipe]: string }>,
  res: Response
) {
  const recipeId = req.params[routeIds.recipe];

  try {
    const reviews = await retrieveRecipeReviews(recipeId);

    res.send(reviews);
  } catch (err) {
    res.status(404).send({
      message: `Could not find reviews for recipe ${recipeId}`,
    });
  }
}

export async function getRecipeReview(
  req: Request<{ [routeIds.review]: string }>,
  res: Response
) {
  const reviewId = req.params[routeIds.review];

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
export async function postRecipeReview(
  req: Request<
    { [routeIds.recipe]: string },
    undefined,
    Prisma.ReviewCreateInput
  >,
  res: Response
) {
  try {
    const review = await createRecipeReview(
      req.params[routeIds.recipe],
      req.body
    );

    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not create review",
    });
  }
}
