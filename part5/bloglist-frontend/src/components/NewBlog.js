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
    <div style={{ marginBottom: '20px' }}>
      <form onSubmit={submitHandler}>
        <div>
          Title: <input type='text' ref={inputTitleRef} />
        </div>
        <div>
          Author: <input type='text' ref={inputAuthorRef} />
        </div>
        <div>
          Url: <input type='text' ref={inputUrlRef} />
        </div>
        <button style={{ marginTop: '5px' }}>Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
