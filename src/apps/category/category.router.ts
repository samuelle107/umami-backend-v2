import express from "express";

import { routes } from "../../utils/routes";
import * as controller from "./category.controller";

const recipeCategoryRouter = express.Router();

recipeCategoryRouter
  .route(routes.categories)
  .get(controller.getRecipeCategories)
  .post(controller.postCategory)
  // Dependent on addAddCategory
  .post(controller.getRecipeCategory);

export default recipeCategoryRouter;
