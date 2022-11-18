import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Loading from './components/Loading';
import Togglable from './components/Togglable';
import {
  getAllBlogs,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
} from './services/blogs';
import { login } from './services/logins';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: null,
    error: null,
  });

  /* ---------- Helper Functions ---------- */
  const fetchNewData = async () => {
    setIsLoading(true);
    const blogs = await getAllBlogs();
    setIsLoading(false);
    setBlogs(blogs);
  };

  /* ---------- useEffect ---------- */

  useEffect(() => {
    if (user) {
      fetchNewData();
    }
  }, [user]);

  useEffect(() => {
    const loggedInUserStorage = window.localStorage.getItem('loggedInUser');
    if (loggedInUserStorage) {
      const user = JSON.parse(loggedInUserStorage);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  /* ---------- Event Handlers ---------- */

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const user = await login(data);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setIsLoading(false);
      setNotification({
        message: `${user.name} was successfully logged in`,
        error: 'success',
      });
    } catch (error) {
      setIsLoading(false);
      setNotification({ message: 'Wrong Credentials', error: 'error' });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedInUser');
      setUser(null);
      setNotification({ message: 'Logout was successful', error: 'success' });
    }
  };

  const handleNewBlog = async (data) => {
    try {
      setIsLoading(true);
      await createBlog(data);
      await fetchNewData();
      setIsLoading(false);
      setNotification({
        message: `The blog "${data.title}" was successfully added to the list`,
        error: 'success',
      });
    } catch (error) {
      setIsLoading(false);
      window.alert('Unknown Error');
    }
  };

  const handleLike = async (likedBlog) => {
    likedBlog.likes++;
    try {
      setIsLoading(true);
      await updateBlog(likedBlog);
      await fetchNewData();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      window.alert('Unknown Error');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      if (window.confirm('Are you sure that you want to delete this blog?')) {
        setIsLoading(true);
        await deleteBlog(id);
        await fetchNewData();
        setIsLoading(false);
        setNotification({ message: 'Blog was successfully deleted', error: 'success' });
      }
    } catch (error) {
      setIsLoading(false);
      window.alert('Unknown Error');
    }
  };

  /* ---------- useRef ---------- */
  const loginFormRef = useRef();

  /* ---------- Return Statements ---------- */

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Loading isLoading={isLoading}>
          <Notification notification={notification} />
          <LoginForm onLogin={handleLogin} />
        </Loading>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Loading isLoading={isLoading}>
        <Notification notification={notification} />

        <span>{user.name} logged in </span>

        <button style={{ marginBottom: '20px' }} onClick={handleLogout}>
          Logout
        </button>

        <Togglable
          showButtonLabel='Create new note'
          hideButtonLabel='Cancel'
          ref={loginFormRef}>
          <NewBlog onNewBlog={handleNewBlog} />
        </Togglable>

        <div style={{ marginTop: '10px' }}>
          {blogs
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
    </div>
  );
};

export default App;
