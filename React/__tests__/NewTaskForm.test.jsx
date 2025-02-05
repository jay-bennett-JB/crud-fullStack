import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ColorModeContext } from "../src/themes";
import TaskForm from "../src/components/TaskForm";
import dayjs from "dayjs";

// Mock useMode hook from themes.js
jest.mock("../src/themes", () => ({
  ...jest.requireActual("../src/themes"),
  useMode: () => [
    jest.requireActual("../src/themes").themeSettings("dark"),
    { toggleColorMode: jest.fn() },
  ],
}));

// Mock media query
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

const theme = createTheme({ palette: { primary: { main: "#1976d2" } } });

const Wrapper = ({ children }) => (
  <ColorModeContext.Provider>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
);

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without crashing", () => {
    render(<TaskForm onSubmit={() => {}} />, { wrapper: Wrapper });

    // Check if all input fields are rendered
    expect(screen.getByLabelText(/Task ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Low/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/High/i)).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    render(<TaskForm onSubmit={() => {}} />, { wrapper: Wrapper });

    // Trigger blur events without filling in the required fields
    fireEvent.blur(screen.getByLabelText(/Task ID/i));
    fireEvent.blur(screen.getByLabelText(/Name/i));
    fireEvent.blur(screen.getByLabelText(/Description/i));

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getAllByText("This is required"));
    });
  });

  test("allows valid input for required fields", async () => {
    render(<TaskForm onSubmit={() => {}} />, { wrapper: Wrapper });

    // Fill in the required fields with valid data
    fireEvent.change(screen.getByLabelText(/Task ID/i), {
      target: { value: "TASK-001" },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Test Description" },
    });

    // Trigger blur events to validate
    fireEvent.blur(screen.getByLabelText(/Task ID/i));
    fireEvent.blur(screen.getByLabelText(/Name/i));
    fireEvent.blur(screen.getByLabelText(/Description/i));

    // Ensure no validation errors are shown
    expect(screen.queryByText("This is required")).not.toBeInTheDocument();
  });

  test("Tests conversion of date to ISO String to send to back end", async () => {
    render(<TaskForm onSubmit={() => {}} />, { wrapper: Wrapper });
    const dateInput = screen.getByLabelText(/due date/i);
    console.debug("dateInput", dateInput);
    fireEvent.change(dateInput, { target: { value: "2025-02-10" } });

    //Check to see if formatted to formatted for datetime
    const formattedDate = screen.getByLabelText(/due date/i).value;
    expect(formattedDate).toBe("2025-02-10");
  });
  test("should set dueDate to null when invalid date is entered", async () => {
    render(<TaskForm onSubmit={() => {}} />, { wrapper: Wrapper }); // Render the TaskCreatePage
    const dateInput = screen.getByLabelText(/due date/i); // Select the DateField by its label

    // Simulate an invalid date input
    fireEvent.change(dateInput, { target: { value: "invalid date" } });

    // Ensure the value is set to null (or blank, depending on how your component handles it)
    expect(dateInput.value).toBe(""); // Assuming the field resets to empty when invalid
  });
});
