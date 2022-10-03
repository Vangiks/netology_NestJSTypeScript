import UsersController from './users.api.controller';
import UsersService from './users.service';
import UsersRoutes from './users.api.routes';

export = {
  controllers: UsersController,
  providers: UsersService,
  routes: UsersRoutes,
};
