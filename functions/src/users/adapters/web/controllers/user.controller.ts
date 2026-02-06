import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../../application/use_cases/create-user.usecase";
import { UserMessages } from "../../../../shared/constants/messages";
import { MapResponse } from "../../../../shared/responses/response";
import { GetUserByEmailUseCase } from "../../../application/use_cases/get-user-by-email.usecase";
import { userAuth, userLogout } from "../../../../shared/middlewares/auth.middleware";

export class UserController
{
    private loggedUsers: Set<string> = new Set<string>();

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUserByEmailUseCase: GetUserByEmailUseCase,
    )
    {}

    /** Permite delegar al caso de uso de buscar usuarios y retornar la respuesta **/
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

            userAuth(user.email,user.id);

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
            const { email, name } = req?.body;

            /** Consulta y valida si el usuario existe **/
            const existingUser = await this.getUserByEmailUseCase.execute(email);
            if(existingUser)
            {
                return res.status(200).json(MapResponse.ResultJson({
                    type: true,
                    messages: UserMessages.SUCCESS.LOGIN,
                    data: existingUser
                }));   
            }

            /** Llama al caso de uso y registra al usuario **/
            const newUser = await this.createUserUseCase.execute(email,name);

            userAuth(newUser.email,newUser.id);

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

    /** Permite cerrar la sesión del usuario en backend **/
    async logoutUser(req: Request, res:Response, next: NextFunction)
    {
        /** Se obtiene la información del usuario de los headers */
        const email = req.headers['x-user-email'] as string;
        const id = req.headers['x-user-id'] as string;

        /** Valida si el usuario esta autenticado **/
        if (!email || !id)
        {
            return res.status(400).json(MapResponse.ResultJson({
                type: false,
                messages: UserMessages.ERROR.ERROR_LOGOUT,
            }));
        }

        userLogout(email, id);

        return res.status(201).json(MapResponse.ResultJson({
            type: true,
            messages: UserMessages.SUCCESS.LOGOUT,
        }));
    }

}