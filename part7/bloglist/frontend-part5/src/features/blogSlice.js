import { createSlice } from '@reduxjs/toolkit';
import { toggleLoading } from './loadingSlice';
import { setNotification } from './notificationSlice';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogs';

const initialState = {
  blogList: [],
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogList = action.payload;
    },
  },
});

export const { addBlog, removeBlog, addLike, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    const blogs = await getAllBlogs();
    dispatch(toggleLoading(false));
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (content) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      await createBlog(content);
      dispatch(initializeBlogs());
      dispatch(toggleLoading(false));
      dispatch(
        setNotification({
          message: `The blog "${content.title}" was successfully added to the list`,
          error: 'success',
        })
      );
    } catch (error) {
      dispatch(toggleLoading(false));
      window.alert('Unknown Error');
    }
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      await updateBlog(content);
      dispatch(initializeBlogs());
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(toggleLoading(false));
      window.alert('Unknown Error');
    }
  };
};

export const destroyBlog = (id) => {
  return async (dispatch) => {
    try {
      if (window.confirm('Are you sure that you want to delete this blog?')) {
        dispatch(toggleLoading(true));
        await deleteBlog(id);
        dispatch(initializeBlogs());
        dispatch(toggleLoading(false));
        dispatch(
          setNotification({ message: 'Blog was successfully deleted', error: 'success' })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(toggleLoading(false));
      window.alert('Unknown Error');
    }
  };
};

export default blogSlice.reducer;
