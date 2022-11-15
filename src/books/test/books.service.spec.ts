import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Book, IDocumentBook } from '../model';
import { BooksService } from '../books.service';
import { bookStub } from './stubs/book.stub';
import { BookModel } from './model';
import { IUpdateBook } from '../dto';

describe('BooksService', () => {
  let booksService: BooksService;
  let bookModel: BookModel;

  describe('find operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksService,
          {
            provide: getModelToken(Book.name),
            useClass: BookModel,
          },
        ],
      }).compile();

      booksService = moduleRef.get<BooksService>(BooksService);
      bookModel = moduleRef.get<BookModel>(getModelToken(Book.name));

      jest.clearAllMocks();
    });

    describe('findById', () => {
      describe('when findById is called', () => {
        let book: IDocumentBook;

        beforeEach(async () => {
          jest.spyOn(bookModel, 'findById');
          book = await booksService.getBook('');
        });

        test('then it should call the bookModel', () => {
          expect(bookModel.findById).toHaveBeenCalledWith('');
        });

        test('then it should return a book', () => {
          expect(book).toEqual(bookStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let books: IDocumentBook[];

        beforeEach(async () => {
          jest.spyOn(bookModel, 'find');
          books = await booksService.getBooks();
        });

        test('then it should call the bookModel', () => {
          expect(bookModel.find).toHaveBeenCalledWith();
        });

        test('then it should return a book', () => {
          expect(books).toEqual([bookStub()]);
        });
      });
    });

    describe('findByIdAndUpdate', () => {
      describe('when findByIdAndUpdate is called', () => {
        let book: IDocumentBook;
        const update: IUpdateBook = { authors: '123' };

        beforeEach(async () => {
          jest.spyOn(bookModel, 'findByIdAndUpdate');
          book = await booksService.updateBook('', update);
        });

        test('then it should call the bookModel', () => {
          expect(bookModel.findByIdAndUpdate).toHaveBeenCalledWith('', update);
        });

        test('then it should return a update book', () => {
          expect(book).toEqual({ ...bookStub(), ...update });
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksService,
          {
            provide: getModelToken(Book.name),
            useValue: BookModel,
          },
        ],
      }).compile();

      booksService = moduleRef.get<BooksService>(BooksService);
      // bookModel = moduleRef.get<BookModel>(getModelToken(Book.name));

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is called', () => {
        let book: IDocumentBook;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(BookModel.prototype, 'save');
          constructorSpy = jest.spyOn(BookModel.prototype, 'constructorSpy');
          book = await booksService.createBook(bookStub());
        });

        test('then it should call the bookModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(bookStub());
        });

        test('then it should return a book', () => {
          expect(book).toEqual(bookStub());
        });
      });
    });
  });

  describe('delete operation', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksService,
          {
            provide: getModelToken(Book.name),
            useClass: BookModel,
          },
        ],
      }).compile();

      booksService = moduleRef.get<BooksService>(BooksService);
      bookModel = moduleRef.get<BookModel>(getModelToken(Book.name));

      jest.clearAllMocks();
    });

    describe('when delete is called', () => {
      let result;

      beforeEach(async () => {
        jest.spyOn(bookModel, 'deleteOne');
        result = await booksService.deleteBook('1');
      });

      test('then it should call the bookModel', () => {
        expect(bookModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      });

      test('then it should return a true', () => {
        expect(result).toEqual(true);
      });
    });
  });
});
