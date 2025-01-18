import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gọi API
export const graphqlQuery = async (query, variables = {}) => {
  const response = await apiClient.post('', {
    query,
    variables,
  });
  return response.data.data;
};
