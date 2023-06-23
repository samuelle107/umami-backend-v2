import { Prisma } from "@prisma/client";
import { validateId } from "src/utils";

import ReviewDAO from "../review.dao";
import reviewCreateSchema from "./review.schema";

export async function retrieveRecipeReviews(recipeId: string | undefined) {
  const validatedId = validateId(recipeId);
  const reviews = ReviewDAO.retrieveRecipeReviews(validatedId);

  return reviews;
}

export async function retrieveRecipeReview(reviewId: string | undefined) {
  const validatedId = validateId(reviewId);
  const review = await ReviewDAO.retrieveRecipeReview(validatedId);

  return review;
}

export async function createRecipeReview(
  recipeId: string | undefined,
  body: any
) {
  const validatedId = validateId(recipeId);

  const data: Prisma.ReviewCreateInput = {
    comment: body.comment,
    rating: body.rating,
    recipe: {
      connect: {
        id: validatedId,
      },
    },
  };

  await reviewCreateSchema.validate(data);

  const review = ReviewDAO.createRecipeReview(data);

  return review;
}
