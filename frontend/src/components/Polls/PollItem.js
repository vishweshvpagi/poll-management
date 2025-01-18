// PollItem.js
import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { pollData } from '../../data';  // relative path from the Polls folder to the data.js file in src

function PollItem() {
  const { id } = useParams();
  const navigate = Navigate();
  const poll = pollData.find((poll) => poll.id === parseInt(id));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
      poll.options[selectedOption].votes += 1;
      navigate(`/results/${poll.id}`);
    }
  };

  return (
    <div>
      <h2>{poll.title}</h2>
      <p>{poll.description}</p>
      <form>
        {poll.options.map((option, index) => (
          <div key={option.id}>
            <input
              type="radio"
              id={`option${option.id}`}
              name="vote"
              value={index}
              onChange={() => setSelectedOption(index)}
            />
            <label htmlFor={`option${option.id}`}>{option.option}</label>
          </div>
        ))}
      </form>
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
}

export default PollItem;