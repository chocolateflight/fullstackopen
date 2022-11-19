import React, { useEffect, useRef, useState } from 'react';
import Togglable from './Togglable';

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const viewDetailsRef = useRef();
  const [likes, setLikes] = useState(props.blog.likes);

  useEffect(() => {
    setLikes(props.blog.likes);
  }, [props.blog.likes]);

  const addLikeHandler = () => {
    props.onLike(props.blog);
  };

  const deleteHandler = () => {
    props.onDelete(props.blog.id);
  };

  return (
    <div style={blogStyle} className='blog'>
      <div >
        <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          {props.blog.title}
        </span>
        <span> by {props.blog.author}</span>
      </div>
      <span>
        <Togglable ref={viewDetailsRef} showButtonLabel='view' hideButtonLabel='hide'>
          <div className='blog-details'>
            <div>URL: {props.blog.url}</div>
            <div>
              <span>Likes: {likes} </span>
              <button onClick={addLikeHandler} className='btn-like'>Like</button>
            </div>
            <div>Author: {props.blog.author}</div>
            {props.blog.user.username === props.user.username ? (
              <button onClick={deleteHandler}>Remove</button>
            ) : null}
          </div>
        </Togglable>
      </span>
    </div>
  );
};

export default Blog;
