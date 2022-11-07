import * as Joi from 'joi';

export const bookSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.string().required(),
  favorite: Joi.boolean().required(),
  fileCover: Joi.string().optional(),
  fileName: Joi.string().optional(),
  fileBook: Joi.string().optional(),
});
