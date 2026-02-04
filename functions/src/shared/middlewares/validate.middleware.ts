import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { UserMessages } from "../constants/messages";
import { MapResponse } from "../responses/response";

/** Permite validar los campos de entrada **/
export const validateData = (schema: ObjectSchema) =>
{
    return(req: Request, res: Response, next: NextFunction) =>
    {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json(MapResponse.ResultJson({
                type: false,
                messages: UserMessages.ERROR.ERROR_GENERAL,
                error: error.details.map(detail => detail.message)
            }));
        }
        next();
    }
}