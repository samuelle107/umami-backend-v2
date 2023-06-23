import { Prisma } from "@prisma/client";

import { validateId } from "../../../utils";
import ReviewRepo from "../review.repo";
import reviewCreateSchema from "./review.schema";

export async function retrieveRecipeReviews(recipeId: string | undefined) {
  const validatedId = validateId(recipeId);
  const reviews = ReviewRepo.retrieveRecipeReviews(validatedId);

  return reviews;
}

export async function retrieveRecipeReview(reviewId: string | undefined) {
  const validatedId = validateId(reviewId);
  const review = await ReviewRepo.retrieveRecipeReview(validatedId);

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

  const review = ReviewRepo.createRecipeReview(data);

  return review;
}
