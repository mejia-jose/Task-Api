import Joi from "joi";

import { UserMessages } from '../../../../shared/constants/messages';

export const UserEmailSchema = Joi.object({
  email: Joi.string().email()
    .required()
    .messages({
      "string.email": UserMessages.ERROR.INVALID_EMAIL,
      "string.empty": UserMessages.ERROR.EMPTY_EMAIL,
      "any.required": UserMessages.ERROR.REQUIRED_EMAIL,
    }),
});


export const CreateUserSchema = Joi.object({
  email: Joi.string().email()
    .required()
    .messages({
      "string.email": UserMessages.ERROR.INVALID_EMAIL,
      "string.empty": UserMessages.ERROR.EMPTY_EMAIL,
      "any.required": UserMessages.ERROR.REQUIRED_EMAIL,
    }),
  name: Joi.string()
  .min(3)
  .required()
  .messages({
    "string.empty": UserMessages.ERROR.NAME_REQUIRED,
    "string.min": UserMessages.ERROR.NAME_LENGTH,
    "any.required": UserMessages.ERROR.NAME_REQUIRED,
  })
});