import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
};

const togglableSlice = createSlice({
  name: 'togglable',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = togglableSlice.actions;
export default togglableSlice.reducer;
