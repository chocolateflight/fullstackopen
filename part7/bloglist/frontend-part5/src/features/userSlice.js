import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../services/blogs';
import { setNotification } from './notificationSlice';
import { toggleLoading } from './loadingSlice';
import { login } from '../services/logins';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedInUserStorage = window.localStorage.getItem('loggedInUser');
    if (loggedInUserStorage) {
      const user = JSON.parse(loggedInUserStorage);
      dispatch(loginUser(user));
      setToken(user.token);
    }
  };
};

export const handleUserLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const user = await login(data);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      dispatch(loginUser(user));
      setToken(user.token);
      dispatch(toggleLoading(false));
      dispatch(
        setNotification({
          message: `${user.name} was successfully logged in`,
          error: 'success',
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(toggleLoading(false));
      dispatch(setNotification({ message: 'Wrong Credentials', error: 'error' }));
    }
  };
};

export const handleUserLogout = () => {
  return (dispatch) => {
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedInUser');
      dispatch(logoutUser());
      dispatch(setNotification({ message: 'Logout was successful', error: 'success' }));
    }
  };
};

export default userSlice.reducer;
