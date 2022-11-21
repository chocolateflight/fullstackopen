import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import Loading from './Loading';

const BlogView = (props) => {
  const { blogList } = useSelector((store) => store.blogs);
  const match = useMatch('/blogs/:id');
  const [detailedBlog, setDetailedBlog] = useState(null);

  const commentInputRef = useRef();

  useEffect(() => {
    if (blogList.length !== 0) {
      setDetailedBlog(match ? blogList.find((b) => b.id === match.params.id) : null);
    }
  }, [blogList]);

  const addLikeHandler = () => {
    props.onLike(detailedBlog);
  };

  const submitHandler = () => {
    const comment = commentInputRef.current.value;
    props.onComment(detailedBlog, comment);
    commentInputRef.current.value = '';
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
      <h2>Comments</h2>
      <ul>
        {detailedBlog.comments.length > 0 ? (
          detailedBlog.comments.map((comment) => <li key={comment}>{comment}</li>)
        ) : (
          <li style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {'There are no comments yet :('}
          </li>
        )}
      </ul>

      <form onSubmit={submitHandler}>
        <input ref={commentInputRef} />
        <button>Add comment</button>
      </form>
    </>
  );
};

export default BlogView;
