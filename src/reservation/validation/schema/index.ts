import * as Joi from 'joi';

export const createReservationSchema = Joi.object().keys({
  hotelRoom: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

// export const updateHotelSchema = Joi.object().keys({
//     title: Joi.string().optional(),
//     description: Joi.string().optional(),
//   });

// export const searchHotelParamsSchema = Joi.object().keys({
//   title: Joi.string().required(),
//   limit: Joi.number().required(),
//   offset: Joi.number().required(),
// });
