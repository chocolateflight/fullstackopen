import React, { useRef } from 'react';

const NewBlog = (props) => {
  const inputTitleRef = useRef();
  const inputAuthorRef = useRef();
  const inputUrlRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const title = inputTitleRef.current.value;
    const author = inputAuthorRef.current.value;
    const url = inputUrlRef.current.value;
    props.onNewBlog({ title, author, url });
    inputTitleRef.current.value = '';
    inputAuthorRef.current.value = '';
    inputUrlRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          Title: <input id='title' type='text' ref={inputTitleRef} />
        </div>
        <div>
          Author: <input id='author' type='text' ref={inputAuthorRef} />
        </div>
        <div>
          Url: <input id='url' type='text' ref={inputUrlRef} />
        </div>
        <button id='btn-submit' className='btn-submit' style={{ marginTop: '5px' }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
