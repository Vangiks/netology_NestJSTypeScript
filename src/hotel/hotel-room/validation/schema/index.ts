import * as Joi from 'joi';

export const createHotelRoomSchema = Joi.object().keys({
  hotelId: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateHotelRoomSchema = Joi.object().keys({
  hotelId: Joi.string().optional(),
  description: Joi.string().optional(),
  isEnabled: Joi.boolean().optional(),
});

export const searchHotelRoomParamsSchema = Joi.object().keys({
  hotel: Joi.string().optional(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});
