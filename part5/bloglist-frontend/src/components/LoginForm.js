import React, { useRef } from 'react';

const LoginForm = (props) => {
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const username = inputUsernameRef.current.value;
    const password = inputPasswordRef.current.value;
    props.onLogin({ username, password });
    inputUsernameRef.current.value = '';
    inputPasswordRef.current.value = '';
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <span>
          Username: <input type='text' ref={inputUsernameRef} />
        </span>
        <div>
          Password: <input type='text' ref={inputPasswordRef} />
        </div>
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
