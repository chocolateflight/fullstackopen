import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    likeAnecdote: (state, action) => {
      console.log('state now: ', state);
      console.log('action', action);
      const id = action.payload;
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
export default anecdoteSlice.reducer;
