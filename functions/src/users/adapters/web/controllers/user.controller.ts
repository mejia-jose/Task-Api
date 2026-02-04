import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../../application/use_cases/create-user.usecase";
import { UserMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";

export class UserController
{
    constructor(
        private createUserUseCase: CreateUserUseCase
    )
    {}

    /** Permite delegar al caso de uso de crear usuarios y retornar la respuesta **/
    async create(req: Request, res:Response, next: NextFunction)
    {
    }
}