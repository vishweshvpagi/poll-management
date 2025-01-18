import React, { useState } from "react";

function SearchFilter() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // Implement search/filter functionality here
    console.log("Searching for:", e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search polls..."
      />
    </div>
  );
}

export default SearchFilter;
