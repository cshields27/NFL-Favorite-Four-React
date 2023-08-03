import { useEffect, useState } from 'react';

const useDjangoAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend API
    const fetchUser = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
          },
        });

        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    // Redirect the user to the Django Allauth login endpoint
    window.location.href = 'http://localhost:8000/accounts/google/login/';
  };

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('authToken');
    // Redirect the user to the Django Allauth logout endpoint
    window.location.href = '/accounts/logout/';
  };

  return { user, handleLogin, handleLogout };
};

export default useDjangoAuth;
