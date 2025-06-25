import { getDayDifference } from "../../src/pages/AsteroidDashboard";

describe("getDayDifference function", () => {
  it("returns correct day difference", () => {
    expect(getDayDifference("2025-06-21", "2025-06-27")).toBe(6);
  });
});
