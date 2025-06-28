import React from "react";

const Restart = ({ score, length, restart }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br font-poppins text-black">
      <div className="bg-white rounded-xl shadow-lg p-12 sm:w-[600px] max-w-full text-center">
        <h2 className="text-xl font-semibold mb-6">
          You answered {score}/{length} correctly!
        </h2>
        <button
          onClick={restart}
          className="bg-[#0f244c] text-white w-full py-5 text-lg font-medium hover:bg-[#112856] focus:bg-[#0e1e3d] transition-colors"
        >
          Restart?
        </button>
      </div>
    </div>
  );
};

export default Restart;
