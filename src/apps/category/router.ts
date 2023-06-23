import * as controller from "./controller";
import express from "express";
import { routes } from "../../utils/routes";

const recipeCategoryRouter = express.Router();

recipeCategoryRouter
  .route(routes.categories)
  .get(controller.getRecipeCategories)
  .post(controller.addCategory)
  // Dependent on addAddCategory
  .post(controller.addRecipeCategory);

export default recipeCategoryRouter;
