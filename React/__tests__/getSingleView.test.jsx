import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import SingleTaskView from "../src/components/SingleTaskView";
import { getSingleTask } from "../src/api";
import { ColorModeContext } from "../src/themes";


//Mocking DataGrid with valid component structure
jest.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows, checkboxSelection }) => (
    <div>
      {rows?.map((row) => (
        <div key={row.taskID}>
          <div>{row.taskID}</div>
          <div>{row.name}</div>
          <div>{row.description}</div>
          <div>{row.dueDate}</div>
          <div>{row.priority}</div>
          {checkboxSelection && <input type="checkbox" />}
        </div>
      ))}
    </div>
  ),
}));

//Mocking API
jest.mock("../src/api", () => ({ getSingleTask: jest.fn() }));

//Mocking theme setup
const mockTheme = {
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    background: { default: "#121212" },
  },
};

const mockColorMode = { toggleColorMode: jest.fn() };

const Wrapper = ({ children }) => {
  return (
    <ColorModeContext.Provider value={mockColorMode}>
      <ThemeProvider theme={mockTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

describe("SingleTaskView Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
     
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockTask = {
    taskID: "TASK-001",
    name: "Test Task",
    description: "Test Description",
    dueDate: "2025-01-29",
    priority: "High",
  };
  test("1. Fetches and displays task data", async () => {
    getSingleTask.mockResolvedValue(mockTask);
    render(<SingleTaskView taskID={mockTask.taskID} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(getSingleTask).toHaveBeenCalledWith(mockTask.taskID);
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  test("2. Shows loading state while fetching data", async () => {
    getSingleTask.mockImplementation(
       
      () => new Promise((resolve) => setTimeout(() => resolve(mockTask), 100))
    );

    render(<SingleTaskView taskID={mockTask.taskID} />, {
      wrapper: Wrapper,
    });
    expect(screen.queryByText("Test Task")).not.toBeInTheDocument();
  });

  test("3. Displays error message on fetch failure", async () => {
    getSingleTask.mockRejectedValue(new Error("API Error"));
    render(<SingleTaskView taskID={mockTask.taskID} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch task")).toBeInTheDocument();
    });
  });
});
