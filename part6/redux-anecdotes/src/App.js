import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';

const App = () => {
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
