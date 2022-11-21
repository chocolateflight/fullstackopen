import axios from 'axios';
const baseUrl = '/api/v1/users';

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export { getUsers };
