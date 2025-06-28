import { useState, useEffect } from "react";
import data from "./data";
import { calculateScore } from "./triviaUtils";
import { getAiResponse } from "./hinter/ai";

import Hint from "../../components/trivia/Hint";
import Questions from "../../components/trivia/Questions";
import Restart from "../../components/trivia/Restart";
import ImageLoader from "../../components/loaders/ImageLoader";

function TriviaQuestions() {
  const [currentQuizData, setCurrentQuizData] = useState(0);
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [score, setScore] = useState(0);
  const quiz = data[currentQuizData];

  async function useAi() {
    setLoadingHint(true);
    const aiResponse = await getAiResponse(quiz);
    setLoadingHint(false);
    setHint(aiResponse);
  }

  const handleNewHint = async () => {
    setLoadingHint(true);
    const reRun = await getAiResponse(quiz, "<hint/>", hint);
    setLoadingHint(false);
    setHint(reRun);
  };

  const handleHintClick = async () => {
    setShowHint(true);
    setLoadingHint(true);
    await useAi();
    setLoadingHint(false);
  };

  const handleExitHint = () => {
    setShowHint(false);
  };

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
      setShowHint(false);
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
      <div className="flex sm:flex-row flex-col items-center font-poppins text-black gap-3">
        <Questions
          handleHintClick={handleHintClick}
          quiz={quiz}
          handleSubmit={handleSubmit}
        />

        <Hint
          showHint={showHint}
          handleExitHint={handleExitHint}
          loadingHint={loadingHint}
          setLoadingHint={setLoadingHint}
          hint={hint}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          handleNewHint={handleNewHint}
        />
      </div>
    );
  } else {
    return <Restart score={score} length={data.length} restart={restart} />;
  }
}

export default TriviaQuestions;
