import express from 'express';

import BooksController from './books.view.controller';

import BooksService from './books.service';
import { mainContainer } from '../container';

const fileStorage = mainContainer.get(BooksService).getDiskStorage();
fileStorage.destination = 'public/books/upload';
fileStorage.diskStorage();

const router = express.Router();

router
  .route('/create')
  .get(BooksController.create)
  .post(fileStorage.upload().single('fileBook'))
  .post(BooksController.createBook);

router.route('/').get(BooksController.getBooks);

router.route('/:id').get(BooksController.getBooks);

router
  .route('/:id/update')
  .get(BooksController.changeBooks)
  .post(fileStorage.upload().single('fileBook'))
  .post(BooksController.updateBook);

router.route('/:id/delete').post(BooksController.deleteBook);

router.route('/:id/download').get(BooksController.downloadBook);

export default router;
