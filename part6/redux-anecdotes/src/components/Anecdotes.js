import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeAnecdote } from '../features/anecdotesSlice';
import { showNotification } from '../features/notificationSlice';

const Anecdotes = () => {
  const [timeoutId, setTimeoutId] = useState();
  const { anecdoteObjects } = useSelector((store) => store.anecdotes);
  const { filter } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    clearTimeout(timeoutId);
    console.log('vote', id);
    dispatch(likeAnecdote(id));
    dispatch(showNotification(`you voted for "${content}"`));
    setTimeoutId(
      setTimeout(() => {
        dispatch(showNotification(''));
      }, 5000)
    );
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
