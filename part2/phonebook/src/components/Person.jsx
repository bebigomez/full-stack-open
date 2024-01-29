const Person = ({ person, handleDeletion }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeletion}>Delete</button>
    </div>
  )
}

export default Person