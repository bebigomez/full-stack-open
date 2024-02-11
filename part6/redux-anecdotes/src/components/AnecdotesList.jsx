/* eslint-disable react/prop-types */

import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return [...anecdotes]
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })

  const Anecdote = ({ anecdote, handleClick }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
  }

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 2))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdotesList
