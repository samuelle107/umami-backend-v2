import { Prisma } from "@prisma/client";

import { validateId } from "../../../utils";
import ReviewService from "../review.service";

export async function retrieveRecipeReviews(recipeId: string | undefined) {
  const validatedId = validateId(recipeId);
  const reviews = ReviewService.retrieveRecipeReviews(validatedId);

  return reviews;
}

export async function retrieveRecipeReview(reviewId: string | undefined) {
  const validatedId = validateId(reviewId);
  const review = await ReviewService.retrieveRecipeReview(validatedId);

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

  const review = ReviewService.createRecipeReview(data);

  return review;
}
