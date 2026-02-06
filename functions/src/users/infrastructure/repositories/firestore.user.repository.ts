import { firestore } from "firebase-admin";

import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";

export class FirestoreUserRepository implements IUserRepository
{
    private readonly collection;
    constructor(private readonly db: firestore.Firestore)
    {
       this.collection = this.db.collection('users');
    }
    
    /** Permite guardar la información de un nuevo usuario **/
    async save(user: UserEntity):Promise<UserEntity>
    {
        await this.collection.doc(user.id).set({
            email: user.email.toLowerCase().trim(),
            name: user.name,
            createdAt: user.createdAt
        })
       return user;
    }

    /** Permite obtener la información del usuario por medio del correo electrónico **/
    async getUserByEmail(email: string):Promise<UserEntity | null>
    {
        /** Se consulta si el usuario existe **/
        const document = await this.collection.where('email', '==', email.toLowerCase().trim())
        .limit(1)
        .get();

        if(document.empty) return null;

       const doc = document.docs[0];
       const data = doc.data();
       return new UserEntity(doc.id, data.email,data.name,data.createdAt.toDate());
    }
}