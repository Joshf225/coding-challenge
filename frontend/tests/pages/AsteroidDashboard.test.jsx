import { fireEvent, render, screen } from "@testing-library/react";
import Loader from "../../src/components/Loader";
import { BrowserRouter } from "react-router-dom";
import AsteroidDashboard from "../../src/pages/AsteroidDashboard";
import DatePicker from "../../src/components/dashboard/DatePicker";
import { vi } from "vitest";

test("renders loader when loading = true", () => {
  let loading = true;
  {
    loading &&
      render(
        <BrowserRouter>
          <Loader />
        </BrowserRouter>
      );
  }

  expect(screen.getByText(/LOADING SPACE MISSION/i)).toBeInTheDocument();
});

test("Clicking DatePicker triggers validation (date difference check)", () => {
  const mockSetFromDate = vi.fn();
  const mockSetToDate = vi.fn();
  const mockSetCheckDate = vi.fn();

  render(
    <BrowserRouter>
      <DatePicker
        setFromDate={mockSetFromDate}
        setCheckDate={mockSetCheckDate}
        setToDate={mockSetToDate}
        checkDate={false}
      />
    </BrowserRouter>
  );
  // console.log("Date picker: ", datePicker.container.innerHTML);
  let fromInput = screen.getByLabelText(/From/i);
  let toInput = screen.getByLabelText(/To/i);
  let checkBtn = screen.getByRole("button", { name: /Check Date/i });
  // console.log("from date: ", fromInput.innerText);

  fireEvent.change(fromInput, { target: { value: "2025-06-01" } });
  fireEvent.change(toInput, { target: { value: "2025-06-11" } });

  fireEvent.click(checkBtn);

  expect(mockSetFromDate).toHaveBeenCalledWith("2025-06-01");
  expect(mockSetToDate).toHaveBeenCalledWith("2025-06-11");
  expect(mockSetCheckDate).toHaveBeenCalledWith(true);
});
