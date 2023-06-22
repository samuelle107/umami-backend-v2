import bodyParser from "body-parser";
import express from "express";

import recipeReviewRouter from "./review/router";
import recipeRouter from "./recipe/router";

const app = express();

// Add middlewares here
app.use(bodyParser.json());

// Routes
app.use(recipeRouter);
app.use(recipeReviewRouter);

export default app;
