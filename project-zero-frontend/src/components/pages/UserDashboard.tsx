import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserNode } from '../../services/user-node-service/user.model';
import { updateUserNode } from '../../services/api';
import UserNodeGraph from '../user/UserNodeGraph';

const UserDashboard: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userNode, setUserNode] = useState<UserNode | null>(null);

  useEffect(() => {
    const fetchUserNode = async () => {
      const storedUserNode = localStorage.getItem('userNode');
      if (storedUserNode) {
        setUserNode(JSON.parse(storedUserNode));
      }
    };

    fetchUserNode();
  }, []);

  const handleProfileUpdate = async (updates: Partial<UserNode>) => {
    if (user && userNode) {
      try {
        const token = await getAccessTokenSilently();
        const updatedUserNode = await updateUserNode(user.sub, updates, token);
        setUserNode(updatedUserNode);
        localStorage.setItem('userNode', JSON.stringify(updatedUserNode));
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }
  };

  if (!userNode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <h1>Welcome, {userNode.username || user?.name}</h1>
      <UserNodeGraph userNode={userNode} />
      {/* Add profile editing form here */}
      {/* Add node creation and interaction components here */}
    </div>
  );
};

export default UserDashboard;