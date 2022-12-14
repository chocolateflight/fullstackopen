import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Loading from './components/Loading';
import Togglable from './components/Togglable';
import Users from './components/Users';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

import { initializeBlogs, newBlog, blogUpdate, destroyBlog } from './features/blogSlice';
import {
  handleUserLogin,
  initializeUser,
  handleUserLogout,
  getAllUsers,
} from './features/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const { blogList } = useSelector((store) => store.blogs);
  const { notification } = useSelector((store) => store.notifications);
  const { user } = useSelector((store) => store.user);

  /* ---------- useEffect ---------- */

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(getAllUsers());
  }, []);

  /* ---------- Event Handlers ---------- */

  const handleLogin = async (data) => {
    dispatch(handleUserLogin(data));
  };

  const handleLogout = () => {
    dispatch(handleUserLogout());
  };

  const handleNewBlog = (data) => {
    dispatch(newBlog(data));
  };

  const handleLike = (likedBlog) => {
    const newBlog = { ...likedBlog, likes: likedBlog.likes + 1 };
    dispatch(blogUpdate(newBlog));
  };

  const handleComment = (commentedBlog, comment) => {
    const newBlog = { ...commentedBlog, comments: [...commentedBlog.comments, comment] };
    dispatch(blogUpdate(newBlog));
  };

  const handleDeleteBlog = (id) => {
    dispatch(destroyBlog(id));
  };

  /* ---------- useRef ---------- */
  const loginFormRef = useRef();

  /* ---------- Return Statements ---------- */

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Loading>
          <Notification notification={notification} />
          <LoginForm onLogin={handleLogin} />
        </Loading>
      </div>
    );
  }

  const main = (
    <Loading>
      <Togglable
        showButtonLabel='Create new note'
        hideButtonLabel='Cancel'
        ref={loginFormRef}>
        <NewBlog onNewBlog={handleNewBlog} />
      </Togglable>

      <div style={{ marginTop: '10px' }}>
        {[...blogList]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onLike={handleLike}
              onDelete={handleDeleteBlog}
            />
          ))}
      </div>
    </Loading>
  );

  return (
    <div>
      <div
        style={{
          backgroundColor: 'lightgrey',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}>
        <span style={{ marginRight: '5px' }}>
          <Link to={'/'}>blogs</Link>
        </span>
        <span style={{ marginRight: '5px' }}>
          <Link to={'/users'}>users</Link>
        </span>
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>blogs</h2>

      <Notification notification={notification} />
      {/* <span>{user.name} logged in </span>

      <button style={{ marginBottom: '20px' }} onClick={handleLogout}>
        Logout
      </button> */}

      <Routes>
        <Route path='/' element={main} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route
          path='/blogs/:id'
          element={<BlogView onLike={handleLike} onComment={handleComment} />}
        />
      </Routes>
    </div>
  );
};

export default App;
