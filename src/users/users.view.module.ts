import UsersController from './users.view.controller';
import UsersService from './users.service';
import UsersRoutes from './users.view.routes';

export = {
  controllers: UsersController,
  providers: UsersService,
  routes: UsersRoutes,
};
