import express from "express";

import { routes } from "../../utils/routes";
import * as controller from "./review.controller";

const recipeReviewRouter = express.Router();

recipeReviewRouter
  .route(routes.reviews)
  .get(controller.getRecipeReviews)
  .post(controller.postRecipeReview);

recipeReviewRouter.route(routes.review).get(controller.getRecipeReview);

export default recipeReviewRouter;
