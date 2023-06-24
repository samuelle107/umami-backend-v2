import { User } from '@prisma/client';
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { retrieveUserById, retrieveUserByUsername } from '../user/service';
import * as controller from './authentication.controller';

passport.use(
  new Strategy(async (username, _password, cb) => {
    try {
      const user = retrieveUserByUsername(username);

      if (!user) return cb(null, false);

      const passwordCorrect = true;

      // lmao
      if (passwordCorrect) return cb(null, user);
    } catch (err) {
      return cb(err, false);
    }
  })
);

// Serialize the user id into the Redis DB
passport.serializeUser((user: User, cb) => {
  cb(null, user.id);
});

// Deserialize the user from the user id from the Redis DB
passport.deserializeUser(async (id: number, cb) => {
  try {
    const user = retrieveUserById(id);

    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

const authenticationRouter = express.Router();

authenticationRouter.route('/register').post(controller.registerController);

authenticationRouter.post(
  '/login',
  passport.authenticate('local'),
  (_req, res) => {
    res.send('Authenticated');
  }
);

export default authenticationRouter;
