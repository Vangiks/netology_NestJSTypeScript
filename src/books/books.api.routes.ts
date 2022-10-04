import express from 'express';
import BooksController from './books.api.controller';

import BooksService from './books.service';
import { mainContainer } from '../container';

const fileStorage = mainContainer.get(BooksService).getDiskStorage();
fileStorage.destination = 'public/books/upload';
fileStorage.diskStorage();

const router = express.Router();

router
  .route('/')
  .get(BooksController.getBooks)
  .post(fileStorage.upload().single('fileBook'))
  .post(BooksController.createBook);

router
  .route('/:id')
  .get(BooksController.getBooks)
  .put(BooksController.updateBook)
  .delete(BooksController.deleteBook);

router.route('/:id/download').get(BooksController.downloadBook);

export default router;
