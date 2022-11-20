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

const likeAnecdoteDB = async (id) => {
  const anecdoteToLike = await axios.get(`${baseUrl}/${id}`);
  const newLikes = anecdoteToLike.data.votes + 1;
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: newLikes });
  return response.data;
};

export { getAllAnecdotes, pushAnecdote, likeAnecdoteDB };
