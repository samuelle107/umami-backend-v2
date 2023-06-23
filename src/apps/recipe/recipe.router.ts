import express from 'express';

import { routes } from '../../utils/routes';
import * as controller from './recipe.controller';

const recipeRouter = express.Router();

recipeRouter
  .route(routes.recipe)
  .get(controller.getRecipe)
  .get(controller.deleteRecipe);

recipeRouter
  .route(routes.recipes)
  .get(controller.getRecipes)
  .post(controller.postRecipe);

export default recipeRouter;
