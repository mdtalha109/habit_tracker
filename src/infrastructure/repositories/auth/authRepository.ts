
import { UserRepository } from 'domain/interface/userRepository';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export class FirebaseAuthRepository implements UserRepository {
    async createUser(username: string, email: string, password: string): Promise<void> {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        if (firebaseUser) {
            await setDoc(doc(db, "Users", firebaseUser.uid), {
                email: email,
                username: username
            })
        };
    }

    async login(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(auth, email, password);
    }
}

