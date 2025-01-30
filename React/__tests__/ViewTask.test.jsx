import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FullViewTaskList from "../src/components/ViewTask";
import { getTasks } from "../src/api";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "../src/themes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Mock DataGrid
jest.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows, columns, loading }) => (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {rows?.map((row) => (
        <div key={row.taskID}>
          {columns.map((col) => (
            <div key={col.field}>{row[col.field]}</div>
          ))}
        </div>
      ))}
    </div>
  ),
}));

//Mock API
jest.mock("../src/api", () => ({
  getTasks: jest.fn(),
}));

// Mock theme setup anf Wrapper
const mockTheme = { palette: { mode: "dark" } };
const mockColorMode = { toggleColorMode: jest.fn() };
const Wrapper = ({ children }) => (
  <ColorModeContext.Provider value={mockColorMode}>
    <ThemeProvider theme={mockTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
);

//Tests
describe("FullViewTaskList Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockTasks = [
    {
      taskID: "TASK-001",
      name: "Task 1",
      description: "Description 1",
      dueDate: "2025-01-01",
      priority: "High",
    },
  ];
  test("1. Displays tasks after loading", async () => {
    getTasks.mockResolvedValue(mockTasks);
    render(<FullViewTaskList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("High")).toBeInTheDocument();
    });
  });

  test("2. Shows loading state initially", () => {
    getTasks.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockTasks), 100))
    );
    render(<FullViewTaskList />, { wrapper: Wrapper });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("3. Displays error on fetch failure", async () => {
    getTasks.mockRejectedValue(new Error("API Error"));
    render(<FullViewTaskList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch tasks")).toBeInTheDocument();
    });
  });
});
