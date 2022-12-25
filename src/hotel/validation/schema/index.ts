import * as Joi from 'joi';

export const createHotelSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateHotelSchema = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

export const searchHotelParamsSchema = Joi.object().keys({
  title: Joi.string().optional(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});
