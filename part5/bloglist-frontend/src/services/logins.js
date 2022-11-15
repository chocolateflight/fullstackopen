import axios from 'axios';
const baseUrl = '/api/v1/login';

const login = async (loginInformation) => {
  const response = await axios.post(baseUrl, loginInformation);
  return response.data;
};

export { login };
