import express from "express";
import bodyParser from "body-parser";

import recipeRouter from "./recipe/router";

const app = express();

// Add middlewares here
app.use(bodyParser.json());

// Routes
app.use(recipeRouter);

export default app;
