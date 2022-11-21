import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: {
    message: null,
    error: null,
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
