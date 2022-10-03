import { Request, Response } from 'express';

import BooksService from './books.service';
import { mainContainer } from '../container';

import { UsersService } from '../users/users.service';

const title = 'Книги';

const booksService = mainContainer.get(BooksService);

class BooksController {
  async getBooks(reques: Request, response: Response) {
    const id = reques.params?.id || '';
    const books = await booksService.getBooks(id, { increase: true });
    if (id) {
      if (books) {
        const user = reques?.user;
        const username = UsersService.isUser(user) ? user.username : 'Аноним';
        response.render('books/view', {
          title,
          book: books,
          user: username,
        });
      } else response.render('errors/404');
    } else if (!Array.isArray(books)) response.render('errors/404');
    else response.render('books/index', { title, books });
  }

  async changeBooks(reques: Request, response: Response) {
    const id = reques.params?.id || '';
    const book = await booksService.getBooks(id);
    if (book) response.render('books/update', { title, book });
    else response.render('errors/404');
  }

  async create(_reques: Request, response: Response) {
    response.render('books/create', { title, book: {} });
  }

  async createBook(reques: Request, response: Response) {
    const file = reques?.file || null;
    let body = reques.body;
    if (body) {
      if (file) {
        body = { ...body, fileName: file.originalname, fileBook: file.path };
      }
      let result = await booksService.createBook(body);

      if (result) response.redirect('/books');
      else response.render('errors/500');
    } else response.render('errors/404');
  }

  async updateBook(reques: Request, response: Response) {
    const file = reques?.file || null;
    const id = reques.params?.id || '';
    let body = reques.body;
    if (id && body) {
      if (file) {
        body = { ...body, fileName: file.originalname, fileBook: file.path };
      }
      const book = await booksService.getBooks(id);
      if (!Array.isArray(book) && book) {
        let updateBook = await booksService.updateBook(id, body);

        if (updateBook) response.redirect(`/books/${book.id}`);
        else response.render('errors/500');
      } else response.render('errors/404');
    } else response.render('errors/404');
  }

  async deleteBook(reques: Request, response: Response) {
    const id = reques.params?.id || '';
    if (id) {
      const book = await booksService.getBooks(id);
      if (book) {
        let result = await booksService.deleteBook(id);

        if (result) response.redirect('/books');
        else response.render('errors/500');
      } else response.render('errors/404');
    } else response.render('errors/404');
  }

  async downloadBook(reques: Request, response: Response) {
    const id = reques.params?.id || '';
    const book = await booksService.getBooks(id);
    if (!Array.isArray(book) && book)
      if (book?.fileBook) {
        return response.status(200).download(book.fileBook);
      } else response.render('errors/404');
    else response.render('errors/404');
  }
}

export default new BooksController();
