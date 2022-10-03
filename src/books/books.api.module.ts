import BooksController from './books.api.controller';
import BooksService from './books.service';
import BooksRoutes from './books.api.routes';

export = {
  controllers: BooksController,
  providers: BooksService,
  routes: BooksRoutes,
};
