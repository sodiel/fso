const Header = (props) => <h1>{props.course}</h1>;

const Total = (props) => <p>Number of exercises {props.total}</p>;

const Content = ({ parts }) => {
  //console.log(parts);
  return parts.map((e) => <Part part={e} />);
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((num, current) => {
          //console.log(current)
          return num + current.exercises;
        }, 0)}
      />
    </div>
  ));
};

export default Course;
