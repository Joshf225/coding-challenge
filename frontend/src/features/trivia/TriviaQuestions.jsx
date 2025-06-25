import { useState } from "react";
import data from "./data";
import { calculateScore } from "./triviaUtils";

function TriviaQuestions() {
  const [currentQuizData, setCurrentQuizData] = useState(0);
  const [score, setScore] = useState(0);
  const quiz = data[currentQuizData];

  function getSelected() {
    const answerEls = document.querySelectorAll(".answer");
    let answer = undefined;

    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });

    return answer;
  }

  function deselectAns() {
    const answerEls = document.querySelectorAll(".answer");
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }

  const handleSubmit = () => {
    const answer = getSelected();

    if (answer) {
      setScore(calculateScore(score, answer, quiz.correct));
      setCurrentQuizData(currentQuizData + 1);
      deselectAns();
    } else {
      alert("Please give an answer");
    }
  };

  const restart = () => {
    setCurrentQuizData(0);
    setScore(0);
  };

  if (currentQuizData < data.length) {
    return (
      <div className="flex items-center justify-center min-h-screen font-poppins text-black">
        <div className="bg-white rounded-xl overflow-hidden w-3/4 sm:w-[600px] sm:max-w-full shadow-lg">
          <div className="sm:p-16 p-10">
            <h2 className="text-xl text-center font-semibold mb-6">
              {quiz.question}
            </h2>
            <ul className="list-none p-0">
              <li className="text-lg my-4">
                <input
                  className="answer mr-2"
                  type="radio"
                  id="a"
                  name="answer"
                />
                <label htmlFor="a" className="cursor-pointer" id="a_text">
                  {quiz.a}
                </label>
              </li>
              <li className="text-lg my-4">
                <input
                  className="answer mr-2"
                  type="radio"
                  id="b"
                  name="answer"
                />
                <label htmlFor="b" className="cursor-pointer" id="b_text">
                  {quiz.b}
                </label>
              </li>
              <li className="text-lg my-4">
                <input
                  className="answer mr-2"
                  type="radio"
                  id="c"
                  name="answer"
                />
                <label htmlFor="c" className="cursor-pointer" id="c_text">
                  {quiz.c}
                </label>
              </li>
              <li className="text-lg my-4">
                <input
                  className="answer mr-2"
                  type="radio"
                  id="d"
                  name="answer"
                />
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
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br font-poppins text-black">
        <div className="bg-white rounded-xl shadow-lg p-12 sm:w-[600px] max-w-full text-center">
          <h2 className="text-xl font-semibold mb-6">
            You answered {score}/{data.length} correctly!
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
  }
}

export default TriviaQuestions;
