import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from '../features/anecdotesSlice';
import notificationReducer from '../features/notificationSlice';
import filterReducer from '../features/filterSlice';

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});
