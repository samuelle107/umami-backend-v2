import * as controller from "./controller";

import express from "express";

const recipeRatingRouter = express.Router();

recipeRatingRouter.get("/recipes/:id/ratings/", controller.getRecipeRatings);
recipeRatingRouter.get(
  "/recipes/:id/ratings/:ratingId/",
  controller.getRecipeRating
);
recipeRatingRouter.post("/recipes/:id/ratings", controller.addRecipeRating);

export default recipeRatingRouter;
