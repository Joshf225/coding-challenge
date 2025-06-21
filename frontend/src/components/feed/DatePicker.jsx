import React from "react";

const DatePicker = ({ setFromDate, setToDate, checkDate, setCheckDate }) => {
  return (
    <div className="flex items-center justify-center gap-5 h-full">
      <label className="block text-gray-700 font-medium mb-1">Date</label>
      {/* From */}
      <div className="">
        <label className="text-black">From</label>
        <input
          // defaultValue={cameras}
          onChange={(e) => setFromDate(`${e.target.value}`)}
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-transparent text-black border-gray-400 cursor-pointer"
          type="date"
        />
      </div>

      {/* To */}
      <div>
        <label className="text-black">To</label>
        <input
          // defaultValue={cameras}
          onChange={(e) => setToDate(`${e.target.value}`)}
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-transparent text-black border-gray-400 cursor-pointer"
          type="date"
        />
      </div>
      <button
        onClick={() => setCheckDate(!checkDate)}
        className="bg-red-500 w-[100px] h-full cursor-pointer"
      >
        Check Date
      </button>
    </div>
  );
};

export default DatePicker;
