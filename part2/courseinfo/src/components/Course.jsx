const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
      ))}    
  </>

const Total = ({ parts }) => {
  const sum = parts.reduce((reducer, item) => reducer + item.exercises, 0)
  return <p><strong>total of {sum}</strong></p>;
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  ) 
}

export default Course