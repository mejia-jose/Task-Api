import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../../application/use_cases/create-user.usecase";
import { UserMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";
import { GetUserByEmailUseCase } from "../../../application/use_cases/get-user-by-email.usecase";

export class UserController
{
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUserByEmailUseCase: GetUserByEmailUseCase,
    )
    {}

    /** Consultar usuario **/
    async findUser(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const { email } = req?.body;

            const user = await this.getUserByEmailUseCase.execute(email);
            if(!user)
            {
                return res.status(404).json(MapResponse.ResultJson({
                    type:false,
                    messages: UserMessages.ERROR.USER_NOT_FOUND
                }))
            }

            return res.status(200).json(MapResponse.ResultJson({
                type: true,
                messages: UserMessages.SUCCESS.LOGIN,
                data: user
            }))

        }catch(error)
        {
            next(error);
        }
    }

    /** Permite delegar al caso de uso de crear usuarios y retornar la respuesta **/
    async create(req: Request, res:Response, next: NextFunction)
    {
        try
        {
            const { email } = req?.body;

            const existingUser = await this.getUserByEmailUseCase.execute(email);
            if(existingUser)
            {
                return res.status(200).json(MapResponse.ResultJson({
                    type: true,
                    messages: UserMessages.SUCCESS.LOGIN,
                    data: existingUser
                }));   
            }

            const newUser = await this.createUserUseCase.execute(email);
            return res.status(201).json(MapResponse.ResultJson({
                type: true,
                messages: UserMessages.SUCCESS.USER_CREATED,
                data: newUser
            }));

        }catch(error)
        {
            next(error)
        }
    }
}