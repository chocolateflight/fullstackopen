import React from 'react'

const Anecdote = ({anecdote}) => {
  return (
    <>
    <h1>{anecdote.content}</h1>
    <div>has {anecdote.votes} votes</div>
    <div>for more info: {anecdote.info}</div>
    </>
  )
}

export default Anecdote