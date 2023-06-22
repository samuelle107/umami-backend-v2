import bodyParser from "body-parser";
import express from "express";

import recipeRatingRouter from "./recipeRating/router";
import recipeRouter from "./recipe/router";

const app = express();

// Add middlewares here
app.use(bodyParser.json());

// Routes
app.use(recipeRouter);
app.use(recipeRatingRouter);

export default app;
