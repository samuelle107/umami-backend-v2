import bodyParser from 'body-parser';
import RedisStore from 'connect-redis';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';

import authenticationRouter from './apps/authentication/authentication.router';
import recipeCategoryRouter from './apps/category/category.router';
import recipeRouter from './apps/recipe/recipe.router';
import recipeReviewRouter from './apps/review/review.router';

const app = express();

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

// Add middlewares here
app.use(bodyParser.json());
app.use(
  session({
    // This is suppose to be a secret key
    secret: 'keyboard cat',
    store: redisStore,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.authenticate('session'));

// Routes
app.use(recipeRouter);
app.use(recipeReviewRouter);
app.use(recipeCategoryRouter);
app.use(authenticationRouter);

// Fallback
app.use((_req, res) => {
  res.send('Unsupported endpoint');
});

export default app;
