import bodyParser from "body-parser";
import express from "express";

import recipeCategoryRouter from "./apps/category/router";
import recipeRouter from "./apps/recipe/router";
import recipeReviewRouter from "./apps/review/router";

const app = express();

// Add middlewares here
app.use(bodyParser.json());

// Routes
app.use(recipeRouter);
app.use(recipeReviewRouter);
app.use(recipeCategoryRouter);

// Fallback
app.use((_req, res) => {
  res.send("Unsupported endpoint");
});

export default app;
