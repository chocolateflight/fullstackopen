import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll } from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const blogs = await getAll();
      setBlogs(blogs);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
