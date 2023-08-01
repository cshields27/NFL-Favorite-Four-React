import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

// Custom hook for Firebase authentication
const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);

    // Set up an observer to check the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the observer on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = () => {
    // Create a Google provider object for Google Sign-In
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    console.log('hi')
    // Trigger the Google Sign-In pop-up
    signInWithRedirect(auth, provider)
      .then((result) => {
        // Handle successful login here if needed
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error('Error signing in:', error);
      });
  };

  const handleLogout = () => {
    // Sign out the user
    signOut(auth)
      .then(() => {
        // Handle successful logout here if needed
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error('Error signing out:', error);
      });
  };

  return { user, handleLogin, handleLogout };
};

export default useFirebaseAuth;
