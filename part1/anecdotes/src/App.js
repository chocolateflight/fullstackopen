import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [quoteVotes, setQuoteVotes] = useState(new Array(anecdotes.length).fill(0));

  const generateQuote = () => {
    let num = Math.floor(Math.random() * anecdotes.length);
    setSelected(num);
  };

  const setVoteHandler = () => {
    setQuoteVotes(
      Object.assign([...quoteVotes], { [selected]: quoteVotes[selected] + 1 })
    );
  };

  const mostVotesIndex = quoteVotes.indexOf(Math.max(...quoteVotes));

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>This anecdote has {quoteVotes[selected]} Votes</div>
      <button onClick={setVoteHandler}>Vote</button>
      <button onClick={generateQuote}>Next Quote</button>
      <h1>Anecdote with highest number of votes</h1>
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>This anecdote has {quoteVotes[mostVotesIndex]} Votes</div>
    </>
  );
};

export default App;
