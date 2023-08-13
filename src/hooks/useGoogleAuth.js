// hooks/useGoogleAuth.js
import { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useAuth } from '../authContext'; // Import the AuthContext
import config from '../config'

const useGoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Use the AuthContext to set the authentication state
  const { setIsLoggedIn: setAuthIsLoggedIn, setUser: setAuthUser } = useAuth();

  const handleLoginSuccess = (tokenResponse) => {
    // Call the API endpoint to send the Google authentication token to Django
    fetch(`${config.API_URL}/auth/google/`, {
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
        localStorage.setItem('userToken', data.user.token); // Store the user token in local storage
      })
      .catch((error) => {
        console.error('Error authenticating with Google:', error);
      });
  };

  useEffect(() => {
    // Check if the user is already authenticated (e.g., from local storage)
    const storedUserToken = localStorage.getItem('userToken');
    if (storedUserToken) {
      fetch(`${config.API_URL}/api/current_user/`, {
        headers: {
          Authorization: `Token ${storedUserToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the authentication state and user data
          setIsLoggedIn(true);
          setUser(data.user);
          setAuthIsLoggedIn(true);
          setAuthUser(data.user);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          handleLogout();
        });
    }
  }, []);

  const handleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
  });
  
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('userToken');
  }

  return { isLoggedIn, user, handleLogin, handleLogout };
};

export default useGoogleAuth;
