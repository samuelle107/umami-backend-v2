import { Prisma } from "@prisma/client";
import reviewRepository from "../dataAccess";
import { validateId } from "../../../utils";

export async function retrieveRecipeReviews(recipeId: string | undefined) {
  const validatedId = validateId(recipeId);
  const reviews = reviewRepository.retrieveRecipeReviews(validatedId);

  return reviews;
}

export async function retrieveRecipeReview(reviewId: string | undefined) {
  const validatedId = validateId(reviewId);
  const review = await reviewRepository.retrieveRecipeReview(validatedId);

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

  const review = reviewRepository.createRecipeReview(data);

  return review;
}
