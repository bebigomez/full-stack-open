import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticRow  = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  const average = ((good - bad) / total).toFixed(1)
  const positiveRatio = (good / total * 100).toFixed(1)

  return (
    <>
      <table>
        <tbody>
          <StatisticRow  text="good" value={good} />
          <StatisticRow  text="neutral" value={neutral} />
          <StatisticRow  text="bad" value={bad} />
          <StatisticRow  text="all" value={total} />
          <StatisticRow  text="average" value={average} />
          <StatisticRow  text="positive" value={`${positiveRatio}%`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => {setGood(good + 1)}} text='good' />
      <Button handleClick={() => {setNeutral(neutral + 1)}} text='neutral' />
      <Button handleClick={() => {setBad(bad + 1)}} text='bad' />

      <h1>statistcs</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App