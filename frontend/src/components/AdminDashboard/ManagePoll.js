import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ManagePolls.css"; // Import the CSS file

const ManagePolls = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        // Simulated API response with hardcoded data
        const dummyPolls = [
          { id: 1, question: "What is your favorite rice?" },
          { id: 2, question: "Do you like coffee or tea?" },
          { id: 3, question: "What is your favorite programming language?" },
        ];
        setPolls(dummyPolls);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    fetchPolls();
  }, []);

  const handleDelete = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== pollId));
      alert("Poll deleted successfully!");
    }
  };

  const handleCreatePoll = () => {
    navigate("/admin/create-poll"); // Navigate to the create poll page
  };

  return (
    <div className="manage-polls">
      <h1>Manage Polls</h1>
      <p>Total Polls: {polls.length}</p>
      <button className="create-poll-button" onClick={handleCreatePoll}>
        Create New Poll
      </button>
      {polls.length === 0 ? (
        <p className="no-polls">No polls available to display.</p>
      ) : (
        <ul className="poll-list">
          {polls.map((poll) => (
            <li key={poll.id} className="poll-item">
              <div>
                <strong>ID:</strong> {poll.id} | <strong>Question:</strong>{" "}
                {poll.question}
              </div>
              <button
                onClick={() => handleDelete(poll.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagePolls;
