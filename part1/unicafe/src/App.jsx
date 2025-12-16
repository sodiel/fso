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
  const average = (bad * -1 + good) / total;
  const positive = (good / total) * 100 + "%";
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>Statistics</h1>
      <table style={{ textAlign: "left" }}>
        <tbody>
          <tr>
            <th scope="row">good</th>
            <td>{good}</td>
          </tr>
          <tr>
            <th scope="row">neutral</th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th scope="row">bad</th>
            <td>{bad}</td>
          </tr>
          <tr>
            <th scope="row">average</th>
            <td>{average}</td>
          </tr>
          <tr>
            <th scope="row">positive</th>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
    </>
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
      <Statistics
        bad={bad}
        good={good}
        neutral={neutral}
        total={total}
      ></Statistics>
    </>
  );
};

export default App;
