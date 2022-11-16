import * as Joi from 'joi';

export const bookCreateSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.string().required(),
  favorite: Joi.boolean().required(),
  fileCover: Joi.string().optional(),
  fileName: Joi.string().optional(),
  fileBook: Joi.string().optional(),
});

export const bookUpdateSchema = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  authors: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
  fileCover: Joi.string().optional(),
  fileName: Joi.string().optional(),
  fileBook: Joi.string().optional(),
  params: Joi.object().keys({
    id: Joi.string().guid().required(),
  }),
});
