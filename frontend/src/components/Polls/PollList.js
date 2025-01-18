// PollList.js
import React from "react";
import { Link } from "react-router-dom";
import { pollData } from '../../data';  // relative path from the Polls folder to the data.js file in src

function PollList() {
  return (
    <div>
      <h2>Poll List</h2>
      <ul>
        {pollData.map((poll) => (
          <li key={poll.id}>
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            <Link to={`/poll/${poll.id}`}>Vote</Link> |
            <Link to={`/results/${poll.id}`}>View Results</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollList;
