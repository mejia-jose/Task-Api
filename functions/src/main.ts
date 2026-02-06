/** Permite que la API funcione correctamente en la nube mediante Firebase Cloud Functions. **/

import * as functions from 'firebase-functions';

import app from "./app";

export const api = functions.https.onRequest(app);