import BooksController from './books.view.controller';
import BooksService from './books.service';
import BooksRoutes from './books.view.routes';

export = {
  controllers: BooksController,
  providers: BooksService,
  routes: BooksRoutes,
};
