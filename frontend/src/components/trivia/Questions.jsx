import React from "react";

const Questions = ({ handleHintClick, quiz, handleSubmit }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden w-3/4 sm:w-[600px] sm:max-w-full shadow-lg relative">
      <span
        className="text-black absolute bottom-[80px] right-5 sm:top-5 sm:right-5 cursor-pointer"
        onClick={handleHintClick}
      >
        Need Help?
      </span>

      <div className="sm:p-16 p-10">
        <h2 className="text-xl text-center font-semibold mb-6">
          {quiz.question}
        </h2>
        <ul className="list-none p-0">
          <li className="text-lg my-4">
            <input className="answer mr-2" type="radio" id="a" name="answer" />
            <label htmlFor="a" className="cursor-pointer" id="a_text">
              {quiz.a}
            </label>
          </li>
          <li className="text-lg my-4">
            <input className="answer mr-2" type="radio" id="b" name="answer" />
            <label htmlFor="b" className="cursor-pointer" id="b_text">
              {quiz.b}
            </label>
          </li>
          <li className="text-lg my-4">
            <input className="answer mr-2" type="radio" id="c" name="answer" />
            <label htmlFor="c" className="cursor-pointer" id="c_text">
              {quiz.c}
            </label>
          </li>
          <li className="text-lg my-4">
            <input className="answer mr-2" type="radio" id="d" name="answer" />
            <label htmlFor="d" className="cursor-pointer" id="d_text">
              {quiz.d}
            </label>
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="bg-[#0f244c] text-white w-full py-5 text-lg font-medium hover:bg-[#112856] focus:bg-[#0e1e3d] transition-colors"
          id="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Questions;
