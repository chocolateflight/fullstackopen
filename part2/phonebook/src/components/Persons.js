import React from 'react';

const Persons = (props) => {
  return (
    <>
      {props.persons
        .filter((person) =>
          person.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map((person) => (
          <div key={person.name} name={person.name} number={person.number}>
            {' '}
            {person.name}: {person.number}
          </div>
        ))}
    </>
  );
};

export default Persons;
