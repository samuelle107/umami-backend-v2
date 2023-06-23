import * as controller from "./controller";

import express from "express";
import { routes } from "../../utils/routes";

const recipeReviewRouter = express.Router();

recipeReviewRouter
  .route(routes.reviews)
  .get(controller.getRecipeReviews)
  .post(controller.addRecipeReview);

recipeReviewRouter.route(routes.review).get(controller.getRecipeReview);

export default recipeReviewRouter;
