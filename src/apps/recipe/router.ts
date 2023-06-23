import * as controller from "./controller";
import express from "express";
import { routes } from "../../utils/routes";

const recipeRouter = express.Router();

recipeRouter
  .route(routes.recipe)
  .get(controller.getRecipe)
  .get(controller.deleteRecipe);

recipeRouter
  .route(routes.recipes)
  .get(controller.getRecipes)
  .post(controller.addRecipe);

export default recipeRouter;
