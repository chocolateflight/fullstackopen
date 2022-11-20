import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = () => {
  const inputAnecdoteRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const newAnecdote = inputAnecdoteRef.current.value;
    dispatch(createAnecdote(newAnecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input ref={inputAnecdoteRef} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default NewAnecdote;
