import bodyParser from "body-parser";
import express from "express";

import recipeRouter from "./recipe/router";

const app = express();

// Add middlewares here
app.use(bodyParser.json());

// Routes
app.use(recipeRouter);

export default app;
