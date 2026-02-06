import { Request, Response, NextFunction } from "express";

import { UserMessages } from "../constants/messages";

const authenticatedUser: Set<string> = new Set<string>();

/** Permite guardar en memoria una clave del usuario logueado **/
export const userAuth = (email: string, id: string) =>
{
    authenticatedUser.add(`${email}:${id}`);
}

/** Permite validar si el usuario esta autenticado **/
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => 
{
    const email = req.headers['x-user-email'] as string;
    const id = req.headers['x-user-id'] as string;
    console.log(req.headers);

    if (!email || !id || !authenticatedUser.has(`${email}:${id}`)) {
        return res.status(401).json({
            success: false,
            messages: UserMessages.ERROR.UNAUTHORIZED
        });
    }

    (req as any).user = { email, id };
    next();
}

/** Permite cerrar la sesión del usuario, destruyendo el registro guardado en memoria **/
export const userLogout = (email: string, id: string) =>
{
  authenticatedUser.delete(`${email}:${id}`);
};