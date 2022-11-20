import { useSelector, useDispatch } from 'react-redux';
import { likeAnecdote } from './reducers/anecdoteReducer';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';

const App = () => {
  return (
    <>
      <Anecdotes />
      <NewAnecdote />
    </>
  );
};

export default App;
