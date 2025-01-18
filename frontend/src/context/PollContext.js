import React, { createContext, useState } from "react";

// Create Context
export const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]);

  return (
    <PollContext.Provider value={{ polls, setPolls }}>
      {children}
    </PollContext.Provider>
  );
};
