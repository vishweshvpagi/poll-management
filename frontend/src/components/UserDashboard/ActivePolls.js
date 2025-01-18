import React, { useEffect, useState } from "react";
import "./ActivePolls.css"; // Make sure the path is correct

const ActivePolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPolls([
        {
          id: 1,
          question: "Which framework do you prefer?",
          options: ["React", "Vue", "Angular"],
        },
        {
          id: 2,
          question: "What is your favorite color?",
          options: ["Red", "Blue", "Green"],
        },
      ]);
    }, 500); // Simulating delay
  }, []);

  return (
    <div>
      <h2>Active Polls</h2>
      {polls.length === 0 ? (
        <p>No active polls at the moment.</p>
      ) : (
        <ul>
          {polls.map((poll) => (
            <li key={poll.id}>
              <h3>{poll.question}</h3>
              <ul>
                {poll.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivePolls;
