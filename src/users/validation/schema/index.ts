import * as Joi from 'joi';

export const userCreateSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const userSigninSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
