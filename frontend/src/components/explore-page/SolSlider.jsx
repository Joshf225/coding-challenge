import React from "react";

const SolSlider = ({ roverMaxSol, sol, setSol }) => {
  return (
    <section className="mt-6">
      <div className="w-full flex items-center justify-center gap-5">
        <label className="block text-gray-700 font-medium mb-1">Sol</label>
        <input
          type="range"
          min="0"
          max={roverMaxSol || 1000}
          defaultValue={sol}
          onChange={(e) => setSol(e.target.value)}
          className="w-1/2 text-bl"
        />
        <p className="text-sm text-gray-600">
          Selected Sol: {sol}/{roverMaxSol || 1000}
        </p>
      </div>
    </section>
  );
};

export default SolSlider;
