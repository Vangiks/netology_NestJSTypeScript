import express from 'express';

import booksModule from './books/books.api.module';
import usersModule from './users/users.api.module';

const router = express.Router();

router.use('/books', booksModule.routes);
router.use('/user', usersModule.routes);

export default router;
