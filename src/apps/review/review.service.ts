import { Prisma } from "@prisma/client";

import prisma from "../../utils/client";

async function retrieveRecipeReviews(recipeId: number) {
  const reviews = await prisma.review.findMany({
    where: {
      recipeId: recipeId,
    },
  });

  return reviews;
}

async function retrieveRecipeReview(reviewId: number) {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  });

  return review;
}

async function createRecipeReview(data: Prisma.ReviewCreateInput) {
  const review = await prisma.review.create({
    data,
  });

  return review;
}

const ReviewService = {
  retrieveRecipeReview,
  retrieveRecipeReviews,
  createRecipeReview,
};

export default ReviewService;
