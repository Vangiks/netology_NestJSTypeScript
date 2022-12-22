import * as Joi from 'joi';

export const findSupportRequestsSchema = Joi.object().keys({
  isActive: Joi.boolean().required(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});

export const markMessagesAsReadSchema = Joi.object().keys({
  createdBefore: Joi.date().required(),
});
