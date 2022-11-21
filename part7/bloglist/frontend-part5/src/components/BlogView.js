import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import Loading from './Loading';

const BlogView = (props) => {
  const { blogList } = useSelector((store) => store.blogs);
  const match = useMatch('/blogs/:id');
  const [detailedBlog, setDetailedBlog] = useState(null);

  useEffect(() => {
    if (blogList.length !== 0) {
      setDetailedBlog(match ? blogList.find((b) => b.id === match.params.id) : null);
    }
  }, [blogList]);

  const addLikeHandler = () => {
    props.onLike(detailedBlog);
  };

  if (detailedBlog === null) {
    return <Loading></Loading>;
  }

  if (detailedBlog === undefined) {
    return <div>Invalid Blog</div>;
  }

  return (
    <>
      <h1>{detailedBlog.title}</h1>
      <div>{detailedBlog.url}</div>
      <span>Likes: {detailedBlog.likes} </span>
      <button onClick={addLikeHandler} className='btn-like' id='btn-like'>
        Like
      </button>
      <div>Added by: {detailedBlog.user.name}</div>
    </>
  );
};

export default BlogView;
