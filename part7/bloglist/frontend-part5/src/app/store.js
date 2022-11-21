import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogSlice';
import loadingReducer from '../features/loadingSlice';
import notificationReducer from '../features/notificationSlice';
import togglableReducer from '../features/togglableSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loading: loadingReducer,
    notifications: notificationReducer,
    togglable: togglableReducer,
    user: userReducer,
  },
});
