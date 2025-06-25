import { calculateScore } from "../../../src/features/trivia/triviaUtils";

describe("calculateScore", () => {
  it("should increment score if correct", () => {
    expect(calculateScore(2, "a", "a")).toBe(3);
  });

  it("should not increment score if incorrect", () => {
    expect(calculateScore(2, "b", "a")).toBe(2);
  });
});
