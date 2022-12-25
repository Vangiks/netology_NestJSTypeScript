import * as Joi from 'joi';

export const findSupportRequestsSchema = Joi.object().keys({
  isActive: Joi.boolean().required(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});

export const sendMessageSupportRequestSchema = Joi.object().keys({
  text: Joi.string().required(),
});

export const createSupportRequestSchema = Joi.object().keys({
  text: Joi.string().required(),
});


export const markMessagesAsReadSchema = Joi.object().keys({
  createdBefore: Joi.date().required(),
});