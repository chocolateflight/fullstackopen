import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote } from '../features/anecdotesSlice';
import { pushAnecdote } from '../services/anecdotes';

const NewAnecdote = () => {
  const inputAnecdoteRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    const newAnecdoteText = inputAnecdoteRef.current.value;
    const newAnecdoteDB = await pushAnecdote(newAnecdoteText);
    dispatch(newAnecdote(newAnecdoteDB));
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
