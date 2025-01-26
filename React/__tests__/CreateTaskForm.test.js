//Imports
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CreateTaskForm from "../src/components/createTaskForm";

test("Formik form validates and submits correctly", async () => {
  const mockSubmit = jest.fn();
  render(<CreateTaskForm onSubmit={mockSubmit} />);

  // Fill out form
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "New Task" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  //Wait for form validation
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      name: "New Task",
      priority: false,
    });
  });
});
