import express from 'express';
import passport from 'passport';

import UsersController from './users.view.controller';

const router = express.Router();

router.route('/').get(UsersController.me);

router.route('/me').get(UsersController.me);

router.route('/login').get(UsersController.login);
router
  .route('/login')
  .post(
    passport.authenticate('local', { failureRedirect: '/user/login' }),
    UsersController.signin
  );

router.route('/logout').get(UsersController.logout);

router.route('/signup').post(UsersController.signup);

export default router;
