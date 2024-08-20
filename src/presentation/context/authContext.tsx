import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'infrastructure/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'domain/entities/user';
import { User as FirebaseUser } from 'firebase/auth';

export interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
    
      if (user) {
        try {
          const docRef = doc(db, 'Users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentUser({
              id: user.uid,
              username: userData.username,
              email: userData.email,
            });
          } else {
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
