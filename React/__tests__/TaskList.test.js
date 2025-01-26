//Imports
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FullViewTaskList from "../src/components/ViewTask";
import * as api from "../src/api";

jest.mock("../src/api");

test("Full View Task List fetches from the API", async () => {
  const mockTasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
  ];
  api.getTasks.mockResolvedValue(mockTasks);

  render(<FullViewTaskList />);

  await waitFor(() => {
    mockTasks.forEach((task) => {
      expect(screen.getByText(taask.name)).toBeInTheDocument();
    });
  });
});
