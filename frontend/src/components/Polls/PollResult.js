// PollResults.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { pollData } from "../../data"; // relative path from the Polls folder to the data.js file in src

function PollResult() {
  const { id } = useParams();
  const poll = pollData.find((poll) => poll.id === parseInt(id));

  if (!poll) {
    return (
      <div>
        <h2>Poll not found!</h2>
        <Link to="/">Back to Poll List</Link>
      </div>
    );
  }

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  // Preparing data for the graph
  const chartData = poll.options.map((option) => ({
    name: option.option,
    votes: option.votes,
    percentage: parseFloat(((option.votes / totalVotes) * 100).toFixed(2)),
  }));

  return (
    <div>
      <h2>Results for {poll.title}</h2>
      <ul>
        {poll.options.map((option) => {
          const percentage = ((option.votes / totalVotes) * 100).toFixed(2);
          return (
            <li key={option.id}>
              <p>
                {option.option}: {option.votes} votes ({percentage}%)
              </p>
              <div
                style={{
                  width: `${percentage}%`,
                  backgroundColor: "green",
                  height: "20px",
                  marginBottom: "10px",
                }}
              />
            </li>
          );
        })}
      </ul>

      <h3>Vote Distribution</h3>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
        <Bar dataKey="percentage" fill="#82ca9d" />
      </BarChart>

      <Link to="/">Back to Poll List</Link>
    </div>
  );
}

export default PollResult;
