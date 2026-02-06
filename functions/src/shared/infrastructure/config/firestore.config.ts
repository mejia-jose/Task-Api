import * as admin from 'firebase-admin';
import * as path from 'path';
import dotenv from 'dotenv';

import { EnvError } from '../../constants/messages';

dotenv.config();

if(admin.apps.length === 0)
{
    /** Para inicializar firestore en local */
    if(process.env.NODE_ENV === 'development' || process.env.FUNCTIONS_EMULATOR)
    {
        const nameFileAccountServices = process.env.ACCOUNT_SERVICES;
        
        if (!nameFileAccountServices)
        {
            throw new Error(EnvError.ACCOUNT_SERVICES_UNDEFINED);
        }

        const configServiceAccount = path.resolve(process.cwd(), nameFileAccountServices);
            admin.initializeApp({
            credential: admin.credential.cert(configServiceAccount)
        });
    }else
    {
        /** Para inicializar firestore en la nube */
        admin.initializeApp();
    } 
}

export const db = admin.firestore();