import React, { useState } from "react";
import "./CreatePoll.css"; // Import the CSS file

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // Start with two options
  const [polls, setPolls] = useState([]); // Simulated poll storage
  const [error, setError] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length >= 10) {
      setError("You can only add up to 10 options.");
      return;
    }
    setError("");
    setOptions([...options, ""]);
  };

  const deleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (options.some((opt) => !opt.trim())) {
      setError("Options cannot be empty.");
      return;
    }
    if (new Set(options).size !== options.length) {
      setError("Options must be unique.");
      return;
    }

    // Simulate saving the poll
    const newPoll = {
      id: polls.length + 1, // Simulate unique ID
      question,
      options,
    };

    setPolls([...polls, newPoll]);
    alert("Poll created successfully!");

    // Reset form
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="create-poll">
      <form onSubmit={handleSubmit}>
        <h1>Create Poll</h1>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Poll Question"
          maxLength={100}
          required
        />
        <p className="character-limit">{question.length}/100 characters</p>
        {options.map((option, index) => (
          <div key={index} className="option-input">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              maxLength={50}
              required
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => deleteOption(index)}
                className="delete-option"
              >
                X
              </button>
            )}
          </div>
        ))}
        <p className="character-limit">{options.length}/10 options</p>
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={addOption} className="add-option">
          Add Option
        </button>
        <button type="submit" className="submit-poll">
          Create Poll
        </button>
      </form>

      <div className="poll-preview">
        <h2>Poll Preview</h2>
        <p>
          <strong>Question:</strong>{" "}
          {question || "Your poll question will appear here."}
        </p>
        <ul>
          {options.map((option, idx) => (
            <li key={idx}>{option || `Option ${idx + 1}`}</li>
          ))}
        </ul>
      </div>

      <div className="created-polls">
        <h2>Created Polls</h2>
        {polls.length === 0 ? (
          <p>No polls created yet.</p>
        ) : (
          <ul>
            {polls.map((poll) => (
              <li key={poll.id}>
                <strong>{poll.question}</strong>
                <ul>
                  {poll.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;
