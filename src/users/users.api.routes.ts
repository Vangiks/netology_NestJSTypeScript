import express from 'express';
import passport from 'passport';

import UsersController from './users.api.controller';

const router = express.Router();

router
  .route('/login')
  .post(passport.authenticate('local'), UsersController.login);
router.route('/me').get(UsersController.me);

router.route('/signup').post(UsersController.signup);

export default router;
