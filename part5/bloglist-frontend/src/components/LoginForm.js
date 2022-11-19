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
    <form onSubmit={submitHandler}>
      <span>
        Username: <input id='username' type='text' ref={inputUsernameRef} />
      </span>
      <div>
        Password: <input id='password' type='password' ref={inputPasswordRef} />
      </div>
      <button id='btn-login'>Login</button>
    </form>
  );
};

export default LoginForm;
