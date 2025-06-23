import React from "react";

const Rover = ({ setRover }) => {
  const handleChange = (e) => {
    setRover(e.target.value);
  };
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">Rover</label>
      <select
        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-white text-black border-gray-400"
        onChange={handleChange}
      >
        <option value="">--Please choose a Rover--</option>
        <option value="curiosity">Curiosity</option>
        <option value="opportunity">Opportunity</option>
        <option value="spirit">Spirit</option>
      </select>
    </div>
  );
};

export default Rover;
