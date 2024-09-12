import React from 'react';
import { UserNode } from '../../services/user-node-service/user.model';

interface UserNodeGraphProps {
  userNode: UserNode;
}

const UserNodeGraph: React.FC<UserNodeGraphProps> = ({ userNode }) => {
  return (
    <div className="user-node-graph">
      <h2>User Node Graph</h2>
      <p>This is where we'll implement the D3.js visualization of the user's node and network.</p>
      <pre>{JSON.stringify(userNode, null, 2)}</pre>
    </div>
  );
};

export default UserNodeGraph;