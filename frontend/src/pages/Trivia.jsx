import React from "react";
import Navbar from "../components/Navbar";
import TriviaQuestions from "../features/trivia/TriviaQuestions";

const Trivia = () => {
  return (
    <div className="h-full bg-[#b8c6db]">
      <Navbar />
      <TriviaQuestions />
    </div>
  );
};

export default Trivia;
