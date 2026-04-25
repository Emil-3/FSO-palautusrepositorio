const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    )}
  </div>
)

const Total = ({ parts }) => (
  <b>total of {parts.map(x => x.exercises).reduce((x, y) => x + y)} exercises</b>
)

const Part = ({ name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App