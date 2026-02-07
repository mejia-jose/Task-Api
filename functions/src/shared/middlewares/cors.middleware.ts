import cors from "cors";

import { CorsError } from "../constants/messages";

const urlList = ['http://localhost:4200',process.env.ALLOWED_ORIGIN];

export const corsMiddleware = cors(
{
    origin: function (origin: any, callback: any) {
        if (urlList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        } else {
        callback(new Error(CorsError.NOT_ALLOWED));
        }
    },
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'x-user-email',
        'x-user-id'
    ],
    credentials: true,
    optionsSuccessStatus: 200
});