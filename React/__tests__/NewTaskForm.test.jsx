import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import TaskForm from "../src/components/TaskForm";
import { ColorModeContext } from "../src/themes";
import { createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    // eslint-disable-next-line no-undef
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without crashing", () => {
    render(<TaskForm />, { wrapper: Wrapper });

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
    render(<TaskForm />, { wrapper: Wrapper });

    // Trigger blur events without filling in the required fields
    fireEvent.blur(screen.getByLabelText(/Task ID/i));
    fireEvent.blur(screen.getByLabelText(/Name/i));
    fireEvent.blur(screen.getByLabelText(/Description/i));

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.findByText("This is required")).toBeInTheDocument(); // Task ID error
    });
    await waitFor(() => {
      expect(screen.findByText("This is required")).toBeInTheDocument(); // Name error
    });
    await waitFor(() => {
      expect(screen.findByText("This is required")).toBeInTheDocument(); // Description error
    });
  });

  test("allows valid input for required fields", async () => {
    render(<TaskForm />, { wrapper: Wrapper });

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
});
