// hooks/useGoogleAuth.js
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../authContext'; // Import the AuthContext

const useGoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Use the AuthContext to set the authentication state
  const { setIsLoggedIn: setAuthIsLoggedIn, setUser: setAuthUser } = useAuth();

  const handleLoginSuccess = (tokenResponse) => {
    // Call the API endpoint to send the Google authentication token to Django
    fetch('http://localhost:8000/auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: tokenResponse.access_token }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (user data) from Django
        setIsLoggedIn(true);
        setUser(data.user); // Store user data in state
        setAuthIsLoggedIn(true); // Update the authentication state in the AuthContext
        setAuthUser(data.user); // Update the user data in the AuthContext
        localStorage.setItem('userToken', data.token); // Store the user token in local storage
      })
      .catch((error) => {
        console.error('Error authenticating with Google:', error);
      });
  };

  // this will likely have to be changed a bit
  useEffect(() => {
    // Check if the user is already authenticated (e.g., from local storage)
    const storedUserToken = localStorage.getItem('userToken');
    if (storedUserToken) {
      setIsLoggedIn(true);
      // You might need to fetch the user data from the backend based on the token
      // and set it to the 'user' state using the 'setUser' function here.
      // Also, update the authentication state in the AuthContext here.
      setAuthIsLoggedIn(true);
      // Update the user data in the AuthContext here.
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
  });

  return { isLoggedIn, user, handleLogin };
};

export default useGoogleAuth;
