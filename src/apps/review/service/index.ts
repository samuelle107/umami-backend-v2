import { Prisma } from '@prisma/client';

import { validateId } from '../../../utils';
import ReviewDAO from '../review.dao';
import reviewCreateSchema from './review.schema';
import { ReviewCreate } from './review.types';

export async function retrieveRecipeReviews(recipeId: string | undefined) {
  const reviews = ReviewDAO.retrieveRecipeReviews(validateId(recipeId));

  return reviews;
}

export async function retrieveRecipeReview(reviewId: string | undefined) {
  const review = await ReviewDAO.retrieveRecipeReview(validateId(reviewId));

  return review;
}

export async function createRecipeReview(
  recipeId: string | undefined,
  body: ReviewCreate
) {
  await reviewCreateSchema.validate(body);

  const newReview = reviewCreateSchema.cast(body, { stripUnknown: true });
  // TODO: review when
  const data: Prisma.ReviewCreateInput = {
    ...newReview,
    user: {
      connect: {
        id: 1,
      },
    },
    recipe: {
      connect: {
        id: validateId(recipeId),
      },
    },
  };

  const review = ReviewDAO.createRecipeReview(data);

  return review;
}
