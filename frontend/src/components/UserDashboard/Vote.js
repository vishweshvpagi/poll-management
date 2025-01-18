import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Vote = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Fetch poll details based on pollId (replace with your actual API call)
    setPoll({
      id: pollId,
      question: "Which framework do you prefer?",
      options: ["React", "Vue", "Angular"],
    });
  }, [pollId]);

  const handleVote = () => {
    if (selectedOption) {
      // Submit the vote here (replace with your actual API call)
      console.log(`Voted for ${selectedOption}`);
      navigate("/user/active-polls");
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <div>
      <h2>{poll?.question}</h2>
      {poll?.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name="vote"
            value={option}
            onChange={() => setSelectedOption(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
};

export default Vote;
