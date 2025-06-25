import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../src/pages/Home";
import { WelcomeParagraph } from "../../src/utils/constants";

test("renders mission to mars heading", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(
    screen.getByRole("heading", { name: /mission to mars/i })
  ).toBeInTheDocument();
});

test("displays the welcome paragraph from constants", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByText(WelcomeParagraph)).toBeInTheDocument();
});

test("has link to Explore Mars page", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const exploreLink = screen.getByRole("link", { name: /explore mars/i });
  expect(exploreLink).toHaveAttribute("href", "/explore-mars");
});

test("has link to Dashboard page", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
  expect(dashboardLink).toHaveAttribute("href", "/dashboard");
});
