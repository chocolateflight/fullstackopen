const Course = (props) => {
  const course = props.course;

  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => {
          return <Part key={part.id} part={part} />;
        })}
      </div>
    );
  };

  const Total = (props) => {
    const parts = props.parts.map((course) => course.exercises);
    const sum = parts.reduce((s, p) => s + p);

    return <p style={{ fontWeight: 'bold' }}>Number of exercises {sum}</p>;
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
