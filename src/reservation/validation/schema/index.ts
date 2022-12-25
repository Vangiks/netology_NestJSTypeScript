import * as Joi from 'joi';

export const createReservationSchema = Joi.object().keys({
  hotelRoom: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
