const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => {
  console.log(props);
  return (
    <>
      {props.parts.map((element) => (
        <Part
          key={element.name}
          part={element.name}
          exercises={element.exercises}
        ></Part>
      ))}
    </>
  );
};

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}
  </p>
);
export default App;
