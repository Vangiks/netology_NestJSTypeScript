import { bookStub } from '../stubs/book.stub';

export const BooksService = jest.fn().mockReturnValue({
  getBook: jest.fn().mockResolvedValue(bookStub()),
  getBooks: jest.fn().mockResolvedValue([bookStub()]),
  createBook: jest.fn().mockResolvedValue(bookStub()),
  updateBook: jest.fn().mockResolvedValue(bookStub()),
  deleteBook: jest.fn().mockResolvedValue(true),
});
