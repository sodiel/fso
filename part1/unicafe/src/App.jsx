import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};
const Statistics = ({ bad, good, neutral, total }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>Statistics</h1>

      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={total}></StatisticLine>
      <Average bad={bad} good={good} total={total}></Average>
      <Positive good={good} total={total}></Positive>
    </>
  );
};

const Average = ({ bad, good, total }) => {
  const average = (bad * -1 + good) / total;
  return <StatisticLine text="average" value={average}></StatisticLine>;
};
const Positive = ({ good, total }) => {
  const percentageOfPositive = (good / total) * 100 + "%";
  return (
    <StatisticLine text="positive" value={percentageOfPositive}></StatisticLine>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = bad + good + neutral;
  return (
    <>
      <h1>Give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" onClick={() => setBad(bad + 1)}></Button>
      <Statistics bad={bad} good={good} total={total}></Statistics>
    </>
  );
};

export default App;
