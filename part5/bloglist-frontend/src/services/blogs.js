import axios from 'axios';

const baseUrl = '/api/v1/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (deleteBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${deleteBlog}`, config);
  return response.data;
};

export { getAllBlogs, setToken, createBlog, updateBlog, deleteBlog };
