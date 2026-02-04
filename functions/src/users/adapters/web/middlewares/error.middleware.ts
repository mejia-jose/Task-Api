import { Request, Response, NextFunction } from "express";
import { MapResponse } from "../../../../shared/responses/response";

export function captureGeneralError(error: any, req:Request, res: Response, next: NextFunction)
{
   const status = error.status || 500;

   res.status(status).json(MapResponse.ResultJson({
    type: false,
    messages: error.message,
    error: error.stack ?? null
   }))
}