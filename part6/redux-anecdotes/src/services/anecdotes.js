import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const pushAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, { content: newAnecdote, votes: 0 });
  return response.data;
};

export { getAllAnecdotes, pushAnecdote };
