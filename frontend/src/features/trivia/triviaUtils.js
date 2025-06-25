export const calculateScore = (currentScore, selectedAnswer, correctAnswer) => {
  return selectedAnswer === correctAnswer ? currentScore + 1 : currentScore;
};
