const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ content }) => (
  <div>
    <Part part={content[0].part} exercises={content[0].exercises}/>
    <Part part={content[1].part} exercises={content[1].exercises}/>
    <Part part={content[2].part} exercises={content[2].exercises}/>
  </div>
)

const Total = ({ sum }) => (
  <p>Number of exercises {sum}</p>
)

const Part = ({ part, exercises}) => (
  <p>
    {part} {exercises}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total sum={content.map(x => x.exercises).reduce((x, y) => x + y)}/>
    </div>
  )
}

export default App