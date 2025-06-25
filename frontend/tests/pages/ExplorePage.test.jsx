import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import ExplorePage from "../../src/pages/ExploreMars";

test("renders explore page UI components", () => {
  render(
    <BrowserRouter>
      <ExplorePage />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("button", { name: /fetch photos/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/Explore Mars/i)).toBeInTheDocument(); // from Navbar
});
