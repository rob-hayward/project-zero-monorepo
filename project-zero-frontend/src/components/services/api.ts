import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const createOrFetchUserNode = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // User doesn't exist, create a new user
      const newUser = await axios.post(`${API_URL}/users`, { id: userId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return newUser.data;
    }
    throw error;
  }
};

export const updateUserNode = async (userId: string, updates: Partial<UserNode>, token: string) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Add more API functions as needed