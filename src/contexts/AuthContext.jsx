import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import { db } from '../firebase'; // Firestore reference
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Additional user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(true); // Set loading to true while fetching user data

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
        setUserData(null); // Reset user data if user is not authenticated
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("userdata:", userData); // Log whenever userData changes
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
