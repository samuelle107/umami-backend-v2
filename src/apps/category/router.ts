import * as controller from "./controller";

import express from "express";

const recipeCategoryRouter = express.Router();

recipeCategoryRouter.get(
  "/recipes/:id/categories",
  controller.getRecipeCategories
);
recipeCategoryRouter.post(
  "/recipes/:id/categories",
  controller.addRecipeCategory
);

export default recipeCategoryRouter;
