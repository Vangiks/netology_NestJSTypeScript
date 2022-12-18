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
  title: Joi.string().required(),
  limit: Joi.number().required(),
  offset: Joi.number().required(),
});
