import cors from "cors";

const urlList = ['http://localhost:4200', 'https://tu-app-angular.com'];

export const corsMiddleware = cors(
{
    origin: function (origin: any, callback: any) {
        if (urlList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        } else {
        callback(new Error('No permitido por políticas de CORS'));
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