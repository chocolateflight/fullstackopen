import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAnecdotes } from './services/anecdotes';
import { setAnecdotes } from './features/anecdotesSlice';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const anecdotes = await getAllAnecdotes();
      dispatch(setAnecdotes(anecdotes));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </>
  );
};

export default App;
