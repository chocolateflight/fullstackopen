import { useState } from 'react';

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text='Good' value={props.good} />
      <StatisticLine text='Neutral' value={props.neutral} />
      <StatisticLine text='Bad' value={props.bad} />
      <StatisticLine text='All' value={props.all} />
      <StatisticLine
        text='Average'
        value={(props.good * 1 + props.bad * -1) / props.all}
      />
      <StatisticLine text='Positive' value={(props.good / props.all) * 100 + '%'} />
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.value}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} value='Good' />
      <Button handleClick={handleClickNeutral} value='Neutral' />
      <Button handleClick={handleClickBad} value='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  );
};

export default App;
