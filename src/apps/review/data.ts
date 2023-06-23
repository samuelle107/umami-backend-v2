import { Prisma } from "@prisma/client";
import prisma from "../../utils/client";

export async function retrieveRecipeReviews(recipeId: number) {
  const reviews = await prisma.review.findMany({
    where: {
      recipeId: recipeId,
    },
  });

  return reviews;
}

export async function retrieveRecipeReview(reviewId: number) {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  });

  return review;
}

export async function createRecipeReview(data: Prisma.ReviewCreateInput) {
  const review = await prisma.review.create({
    data,
  });

  return review;
}
