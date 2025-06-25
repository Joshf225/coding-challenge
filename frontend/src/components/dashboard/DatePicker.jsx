import React from "react";

const DatePicker = ({ setFromDate, setToDate, checkDate, setCheckDate }) => {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-5 h-full py-4">
      {/* <label className="block text-gray-700 font-medium mb-1">Date</label> */}
      {/* From */}
      <div className="flex sm:flex-row flex-col items-center justify-center gap-3">
        <div>
          <label className="text-black" htmlFor="fromDate">
            From
          </label>
          <input
            onChange={(e) => setFromDate(`${e.target.value}`)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-white text-black border-gray-400 cursor-pointer"
            type="date"
            id="fromDate"
          />
        </div>

        {/* To */}
        <div>
          <label className="text-black" htmlFor="toDate">
            To
          </label>
          <input
            // defaultValue={cameras}
            onChange={(e) => setToDate(`${e.target.value}`)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-white text-black border-gray-400 cursor-pointer"
            type="date"
            id="toDate"
          />
        </div>
        <button
          onClick={() => setCheckDate(!checkDate)}
          className="bg-red-500 sm:w-[100px] w-full h-[40px] cursor-pointer mt-5"
        >
          Check Date
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
