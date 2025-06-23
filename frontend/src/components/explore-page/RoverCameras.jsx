import React from "react";

const RoverCameras = ({ RoverDetails, cameras, setCameras }) => {
  return (
    <div className={RoverDetails ? "block" : "hidden"}>
      <label className="block text-gray-700 font-medium mb-1">Camera</label>
      <select
        defaultValue={cameras}
        onChange={(e) => setCameras(e.target.value)}
        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-white text-black border-gray-400"
      >
        <option value="navcam" key="navcam">
          NAVCAM
        </option>
        <option value="fhaz" key="fhaz">
          FHAZ
        </option>
        <option value="rhaz" key="rhaz">
          RHAZ
        </option>
        <option value="mast" key="mast">
          MAST
        </option>
        <option value="chemcam" key="chemcam">
          CHEMCAM
        </option>
      </select>
    </div>
  );
};

export default RoverCameras;
