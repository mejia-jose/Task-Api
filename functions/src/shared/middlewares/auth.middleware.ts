import { Request, Response, NextFunction } from "express";

import { UserMessages } from "../constants/messages";

const authenticatedUser: Set<string> = new Set<string>();

export const userAuth = (email: string, id: string) =>
{
    console.log(`${email}:${id}`);
    authenticatedUser.add(`${email}:${id}`);
}

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