import * as admin from 'firebase-admin';
import * as path from 'path';

const configServiceAccount = path.resolve(process.cwd(),'firebase-service-account.json');

if(admin.apps.length === 0)
{
    admin.initializeApp({
        credential: admin.credential.cert(configServiceAccount)
    });
}

export const db = admin.firestore();