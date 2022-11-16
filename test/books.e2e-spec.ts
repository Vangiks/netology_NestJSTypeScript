import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { Book, BookDocument, BookModel } from '../src/books/model';
import { AuthModule } from '../src/auth/auth.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, Types } from 'mongoose';
import { factory } from 'fakingoose';
import { ICreateBook, IUpdateBook } from 'src/books/dto';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let bookModel;
  let bookMock;
  let httpServer: any;

  const bookFactory = factory<BookDocument>(BookModel).setGlobalObjectIdOptions(
    { tostring: false },
  );
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {
              uri: uri,
            };
          },
        }),
        BooksModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    bookModel = moduleFixture.get<Model<BookDocument>>(
      getModelToken(Book.name),
    );
    await app.init();

    httpServer = app.getHttpServer();
  });

  beforeEach(async () => {
    const generateBook = bookFactory.generate(
      {},
      {
        _id: {
          skip: true,
        },
        __v: {
          skip: true,
        },
      },
    );
    const book = new bookModel(generateBook);
    bookMock = await book.save();
  });

  it('/books (GET)', async () => {
    const response = await request(httpServer).get('/books');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/books/:id (GET)', async () => {
    const response = await request(httpServer).get(`/books/${bookMock._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ _id: bookMock._id });
  });

  it('/books (POST)', async () => {
    const createBookDTO: ICreateBook = {
      authors: 'Иван',
      description: 'Описание',
      favorite: true,
      title: 'Заголовок',
    };

    const response = await request(httpServer)
      .post('/books')
      .send(createBookDTO);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(createBookDTO);
  });

  it('/books (PUT)', async () => {
    const updateBookDTO: IUpdateBook = {
      title: 'Заголовок',
    };

    const response = await request(httpServer)
      .put(`/books/${bookMock._id}`)
      .send(updateBookDTO);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ _id: bookMock._id });
  });

  it('/books (Delete)', async () => {
    const response = await request(httpServer).delete(`/books/${bookMock._id}`);

    expect(response.status).toBe(200);
    expect(response.text).toEqual('true');
  });

  afterEach(async () => await bookModel.deleteMany({}));

  afterAll(async () => {
    await app.close();
  });
});
