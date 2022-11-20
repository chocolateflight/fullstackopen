import { useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { createAnecdote } from '../reducers/anecdoteReducer';
import { newAnecdote } from '../features/anecdotesSlice';

const NewAnecdote = () => {
  const inputAnecdoteRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const newAnecdoteText = inputAnecdoteRef.current.value;
    dispatch(newAnecdote(newAnecdoteText));
    inputAnecdoteRef.current.value = '';
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
