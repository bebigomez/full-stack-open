import { useState } from 'react'

const Anecdote = ({ text, votes, handleVote, nextAnecdote}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
          {text}
          <div>has {votes} votes</div>
          <button onClick={handleVote}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function getRandomAnecdote() {
    const min = 0
    const max = anecdotes.length;
    return Math.floor(Math.random() * (max - min) + min);
    }

  const [selected, setSelected] = useState(getRandomAnecdote())
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    setSelected(getRandomAnecdote())
  }

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Anecdote 
      text={anecdotes[selected]}
      votes={votes[selected]}
      handleVote={handleVote}
      nextAnecdote={nextAnecdote}    
      />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedIndex]}
    </div>
  )
}

export default App