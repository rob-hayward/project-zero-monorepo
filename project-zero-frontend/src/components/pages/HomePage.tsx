import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { createOrFetchUserNode } from '../../services/api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const userNode = await createOrFetchUserNode(user.sub, token);
          // Store the user node information in local storage or state management
          localStorage.setItem('userNode', JSON.stringify(userNode));
          navigate('/dashboard');
        } catch (error) {
          console.error('Error creating/fetching user node:', error);
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="home-page">
      <h1>PROJECT ZER0</h1>
      <div className="content-wrapper">
        <h2>EXPERIMENT / GAME / REVOLUTION</h2>
        <button 
          className="enter-button" 
          onClick={handleLogin}
          aria-label="Enter Project Zero"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default HomePage;