import { useSelector, useDispatch } from 'react-redux';
import { sendLike } from '../features/anecdotesSlice';
import { setNotification } from '../features/notificationSlice';

const Anecdotes = () => {
  const anecdoteObjects = useSelector((store) => store.anecdotes);
  const { filter } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(sendLike(id));
    dispatch(setNotification(`you voted for "${content}"`, 5));
  };

  return (
    <div>
      {[...anecdoteObjects]
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
        .filter((anecdote) =>
          anecdote.content.toUpperCase().includes(filter.toUpperCase())
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
