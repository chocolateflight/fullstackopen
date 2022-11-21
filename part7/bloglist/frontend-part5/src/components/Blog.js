import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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

  const addLikeHandler = () => {
    props.onLike(props.blog);
  };

  const deleteHandler = () => {
    props.onDelete(props.blog.id);
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${props.blog.id}`}>
          <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
            {props.blog.title}
          </span>
        </Link>
        <span> by {props.blog.author}</span>
      </div>
      <span>
        <Togglable ref={viewDetailsRef} showButtonLabel='view' hideButtonLabel='hide'>
          <div className='blog-details'>
            <div>URL: {props.blog.url}</div>
            <div>
              <span>Likes: {props.blog.likes} </span>
              <button onClick={addLikeHandler} className='btn-like' id='btn-like'>
                Like
              </button>
            </div>
            <div>Author: {props.blog.author}</div>
            <div>Comments: {props.blog.comments.length}</div>
            {props.blog.user.username === props.user.username ? (
              <button
                style={{ marginTop: '5px' }}
                id='btn-remove'
                onClick={deleteHandler}>
                Remove
              </button>
            ) : null}
          </div>
        </Togglable>
      </span>
    </div>
  );
};

export default Blog;
