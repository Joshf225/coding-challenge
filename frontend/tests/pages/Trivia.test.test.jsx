// tests/pages/Trivia.test.jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Trivia from "../../src/pages/Trivia";

test("renders trivia page with questions", () => {
  render(
    <BrowserRouter>
      <Trivia />
    </BrowserRouter>
  );

  // assert something unique to the question
  expect(screen.getByText(/What color is Mars/i)).toBeInTheDocument();

  // or assert the submit button
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});
