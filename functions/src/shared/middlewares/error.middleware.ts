import { Request, Response, NextFunction } from "express";
import { MapResponse } from "../responses/response";

export function captureGeneralError(error: any, req:Request, res: Response, next: NextFunction)
{
   const status = error.status || 500;

   console.error(error.stack);
   
   res.status(status).json(MapResponse.ResultJson({
    type: false,
    messages: error.message || 'Ocurrió un error inesperado.',
    //error: error.stack ?? null
   }))
}