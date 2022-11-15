import axios from 'axios';
const baseUrl = '/api/v1/blogs';

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

export { getAll };
