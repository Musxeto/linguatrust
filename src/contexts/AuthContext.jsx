import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(true); 

      if (user) {
        try {
          const usersCollectionRef = collection(db, 'users');
          const q = query(usersCollectionRef, where('email', '==', user.email)); 
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data()); 
            });
          } else {
            console.log('No such document for user data!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("userdata:", userData);
  }, [userData]);

  const value = {
    currentUser,
    userData, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
