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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={parts}/>
      <Total sum={parts.map(x => x.exercises).reduce((x, y) => x + y)}/>
    </div>
  )
}

export default App