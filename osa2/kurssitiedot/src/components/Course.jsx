const Part = ({ name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Header = ({ course }) => (
  <h2>{course}</h2>
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

const Course = ({ course }) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
  </div>
)

export default Course