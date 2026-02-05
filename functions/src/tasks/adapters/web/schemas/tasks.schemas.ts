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

export const GetAllTasksSchema = Joi.object(
{
  userId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "any.required": TaskMessages.ERROR.REQUIRED_USER_ID,
      "string.guid": TaskMessages.ERROR.USERID_TYPE_UUID
    }),
});

export const UpdateTasksSchema = Joi.object({
  taskId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": TaskMessages.ERROR.TASKS_TYPE_UUID,
      "any.required": TaskMessages.ERROR.REQUIRED_TASKS_ID,
    }),

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
});

export const UpdateStatusTasksSchema = Joi.object(
{
  taskId: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
       "string.guid": TaskMessages.ERROR.TASKS_TYPE_UUID,
      "any.required": TaskMessages.ERROR.REQUIRED_TASKS_ID,
    }),
});