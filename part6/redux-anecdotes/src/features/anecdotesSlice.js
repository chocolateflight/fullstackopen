import { createSlice } from '@reduxjs/toolkit';
import { getAllAnecdotes, pushAnecdote, likeAnecdoteDB } from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    likeAnecdote: (state, action) => {
      console.log('state now: ', state);
      console.log('action', action);
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
    newAnecdote: (state, action) => {
      console.log('state now: ', state);
      console.log('action', action);
      state.push(action.payload);
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { likeAnecdote, newAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await pushAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const sendLike = (id) => {
  return async (dispatch) => {
    const likedAnecdote = await likeAnecdoteDB(id);
    dispatch(likeAnecdote(likedAnecdote));
  };
};

export default anecdoteSlice.reducer;
