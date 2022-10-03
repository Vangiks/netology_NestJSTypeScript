import { Request, Response, NextFunction } from 'express';
import { IUser } from './dto';

import UsersService from './users.service';
import { mainContainer } from '../container';

const usersService = mainContainer.get(UsersService);

const title = 'Профиль';

class UsersController {
  login(_request: Request, response: Response) {
    return response.render('user/login-register', { title });
  }

  signin(request: Request, response: Response) {
    const { user } = request;
    if (user) {
      return response.redirect('/user/me');
    } else return response.render('user/login-register', { title });
  }

  logout(request: Request, response: Response, next: NextFunction) {
    request.logout((err) => {
      if (err) {
        return next(err);
      }
      response.redirect('/user');
    });
  }

  async me(request: Request, response: Response) {
    const { user } = request;
    if (!request.isAuthenticated()) {
      return response.redirect('/user/login');
    }
    return response.render('user/me', { user, title });
  }

  async signup(request: Request, response: Response) {
    const user: IUser = request.body;

    await usersService.createUser(user);
    return response.redirect('/user/login');
  }
}

export default new UsersController();
