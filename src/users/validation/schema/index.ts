import * as Joi from 'joi';
import { ERole } from 'src/users/types';

export const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  contactPhone: Joi.string().optional(),
  role: Joi.valid(...Object.values(ERole)),
});

export const searchUserParamsSchema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  contactPhone: Joi.string().optional(),
  limit: Joi.number().required(),
  offset: Joi.number().required(),
});
