import Joi from "joi";

import { TaskMessages } from "../../../../shared/constants/messages";

export const CreateTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
      "string.base": TaskMessages.ERROR.INVALID_TITLE,
      "string.empty": TaskMessages.ERROR.REQUIRED_TITLE,
      "string.min": TaskMessages.ERROR.TITLE_LENGTH,
      "any.required": TaskMessages.ERROR.REQUIRED_TITLE,
    }),

  description: Joi.string()
    .trim()
    .allow('')
    .optional()
    .messages({
      "string.base": TaskMessages.ERROR.INVALID_DESCRIPTION,
    }),

  userId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": TaskMessages.ERROR.INVALID_USER_ID,
      "any.required": TaskMessages.ERROR.REQUIRED_USER_ID,
    }),
});