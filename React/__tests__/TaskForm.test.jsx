import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import TaskForm from "../src/components/TaskForm";
import { createTask } from "../src/api";
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

// Mock API
jest.mock("../src/api", () => ({
  createTask: jest.fn(() => Promise.resolve({ data: {} })),
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const Wrapper = ({ children }) => (
  <ColorModeContext.Provider>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
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
    render(<TaskForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/Task ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test("submits valid form data", async () => {
    render(<TaskForm />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText("Task ID"), {
      target: { value: "TASK-001" },
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByLabelText("Medium"));

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          taskID: "TASK-001",
          name: "Test Task",
          description: "Test Description",
          priority: "med",
        })
      );
    });
  });
});
