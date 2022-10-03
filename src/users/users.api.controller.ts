import { Request, Response } from 'express';
import { IUser } from './dto';

import UsersService from './users.service';

import { mainContainer } from '../container';

const usersService = mainContainer.get(UsersService);

class UsersController {
  login(request: Request, response: Response) {
    if (request.user) {
      return response.status(200).send({
        response: 'OK',
        errors: [],
        status: true,
      });
    } else
      return response.status(401).send({
        response: 'No authorization',
        errors: ['No authorization'],
        status: false,
      });
  }

  async me(request: Request, response: Response) {
    const { user } = request;
    if (!request.isAuthenticated()) {
      return response.status(401).send({
        response: false,
        errors: ['No authorization'],
        status: false,
      });
    }
    return response.status(200).send({
      response: user,
      errors: [],
      status: true,
    });
  }

  async signup(request: Request, response: Response) {
    const user: IUser = request.body;

    const result = await usersService.createUser(user);
    if (!result) {
      return response.status(500).send({
        response: false,
        errors: ['Not signup user'],
        status: false,
      });
    }
    return response.status(200).send({
      response: true,
      errors: [],
      status: true,
    });
  }
}

export default new UsersController();
