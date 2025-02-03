//Imports
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme } from "@mui/material/styles";
// eslint-disable-next-line no-unused-vars
import dayjs from "dayjs";

import { ColorModeContext } from "../src/themes";
import TaskCreatePage from "../src/scenes/createTask/index.jsx";
import { createTask } from "../src/api";
jest.mock("../src/api", () => ({ createTask: jest.fn() }));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

//Mocking theme setup
const theme = createTheme({ palette: { primary: { main: "#1976d2" } } });

const mockColorMode = { toggleColorMode: jest.fn() };

const Wrapper = ({ children }) => {
  return (
    <ColorModeContext.Provider value={mockColorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

//Integration Testing for Creating Task Page
describe("Task Create Page", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    useNavigate.mockReturnValue(navigate);
    createTask.mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //Test 1 Submits form and navigates to succes page
  test("submits form and navigates on success", async () => {
    render(<TaskCreatePage />, { wrapper: Wrapper });

    // Simulate user input (adjust selectors based on your form)
    await userEvent.type(screen.getByLabelText(/task id/i), "TASK-001");
    await userEvent.type(screen.getByLabelText(/name/i), "Test Task");
    await userEvent.type(screen.getByLabelText(/description/i), "Test Description");
    const dateInput = screen.getByText("dueDate");
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, "2025-01-01");
    // Submit the form
    await userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      // Verify API call with expected data
      expect(createTask).toHaveBeenCalledWith({
        taskID: "TASK-001",
        name: "Test Task",
        description: "Test Description",
        priority: "low",
        dueDate: "2025-01-01T00:00:00.000Z",
      });
      expect(navigate).toHaveBeenCalledWith("/success", expect.anything());
    });
  });
});
