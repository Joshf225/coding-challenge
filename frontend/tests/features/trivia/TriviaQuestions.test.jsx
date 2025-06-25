import { render, screen, fireEvent } from "@testing-library/react";
import TriviaQuestions from "../../../src/features/trivia/TriviaQuestions";
import data from "../../../src/features/trivia/data";

test("renders first trivia question", () => {
  render(<TriviaQuestions />);
  expect(screen.getByText(data[0].question)).toBeInTheDocument();
});

test("submits answer and shows next question", () => {
  render(<TriviaQuestions />);
  const option = screen.getByLabelText(data[0].a); // adjust based on real option text
  fireEvent.click(option);
  fireEvent.click(screen.getByText(/submit/i));

  expect(screen.getByText(data[1].question)).toBeInTheDocument();
});
