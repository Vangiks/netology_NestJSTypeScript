import * as Joi from 'joi';

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  contactPhone: Joi.string(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
