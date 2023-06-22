import * as controller from "./controller";

import express from "express";

const recipeRouter = express.Router();

recipeRouter.get("/recipes/:id", controller.getRecipe);
recipeRouter.get("/recipes", controller.getRecipes);
recipeRouter.post("/recipes", controller.addRecipe);
recipeRouter.delete("/recipes/:id", controller.deleteRecipe);

export default recipeRouter;
