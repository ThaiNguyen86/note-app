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

// API gọi GraphQL để đăng ký người dùng
export const registerUser = async (username, password) => {
  const query = `
    mutation RegisterUser($username: String!, $password: String!) {
      register(username: $username, password: $password) {
        token
        user {
          id
          username
        }
      }
    }
  `;

  const variables = { username, password };

  return await graphqlQuery(query, variables);  // Gọi graphqlQuery và trả về thông tin người dùng sau khi đăng ký
};

// API gọi GraphQL để đăng nhập người dùng
export const loginUser = async (username, password) => {
  const query = `
    mutation LoginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        user {
          id
          username
        }
      }
    }
  `;
  
  const variables = { username, password };

  return await graphqlQuery(query, variables);  // Gọi graphqlQuery và trả về token và người dùng đăng nhập
};

export const getAllFolders = async () => {
  const query = `query {
      folder {
          id
          name
          createdAt
      }
  }`;
  return await graphqlQuery(query);
}

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};
