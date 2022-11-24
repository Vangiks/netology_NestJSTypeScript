import * as Joi from 'joi';

export const bookCommentCreateSchema = Joi.object().keys({
  bookId: Joi.string().required(),
  comment: Joi.string().optional(),
});
