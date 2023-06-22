import * as controller from "./controller";

import express from "express";

const recipeReviewRouter = express.Router();

recipeReviewRouter.get("/recipes/:id/reviews/", controller.getRecipeReviews);
recipeReviewRouter.get(
  "/recipes/:id/reviews/:reviewId/",
  controller.getRecipeReview
);
recipeReviewRouter.post("/recipes/:id/reviews", controller.addRecipeReview);

export default recipeReviewRouter;
