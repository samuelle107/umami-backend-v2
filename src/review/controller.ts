import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../utils/client";

export async function getRecipeReviews(req: Request, res: Response) {
  const recipeId: string | undefined = req.params.id;

  try {
    const review = await prisma.review.findMany({
      where: {
        recipeId: Number(recipeId),
      },
    });

    res.send(review);
  } catch (err) {
    res.status(404).send({
      message: `Could not find reviews for recipe ${recipeId}`,
    });
  }
}

export async function getRecipeReview(req: Request, res: Response) {
  const reviewId: string | undefined = req.params.reviewId;

  try {
    const review = await prisma.review.findUnique({
      where: {
        id: Number(reviewId),
      },
    });

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
export async function addRecipeReview(req: Request, res: Response) {
  const recipeId = Number(req.params.id);

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
    const review = await prisma.review.create({
      data,
    });

    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Could not create review",
    });
  }
}
