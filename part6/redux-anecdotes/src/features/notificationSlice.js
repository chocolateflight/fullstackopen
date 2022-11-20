import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { showNotification } = notificationSlice.actions;

let timeoutID;
export const setNotification = (message, reset) => {
  return (dispatch) => {
    clearTimeout(timeoutID);
    dispatch(showNotification(message));
    timeoutID = setTimeout(() => {
      dispatch(showNotification(''));
    }, reset * 1000);
  };
};

export default notificationSlice.reducer;
