const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ content }) => (
  <div>
    <Part name={content[0].name} exercises={content[0].exercises}/>
    <Part name={content[1].name} exercises={content[1].exercises}/>
    <Part name={content[2].name} exercises={content[2].exercises}/>
  </div>
)

const Total = ({ sum }) => (
  <p>Number of exercises {sum}</p>
)

const Part = ({ name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={[part1, part2, part3]}/>
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App