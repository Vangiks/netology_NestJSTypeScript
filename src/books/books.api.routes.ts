import express from 'express';
import BooksController from './books.api.controller';
import File from '../../middleware/file';

const router = express.Router();

const file = new File('public/books/upload', null, { uniqueName: true });

router
  .route('/')
  .get(BooksController.getBooks)
  .post(file.upload().single('fileBook'))
  .post(BooksController.createBook);

router
  .route('/:id')
  .get(BooksController.getBooks)
  .put(BooksController.updateBook)
  .delete(BooksController.deleteBook);

router.route('/:id/download').get(BooksController.downloadBook);

export default router;
