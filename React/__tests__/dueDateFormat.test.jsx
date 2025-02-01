import React from "react";
import { createTask } from "../src/api";
import { formatTaskValue } from "../src/scenes/createTask/index.jsx";

describe("Format Task Value", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should format dueDate as an ISO String, before sending", async () => {
    const navigate = jest.fn(); //Mock Navigate Function

    const values = {
      dueDate: "2025-02-10T00:00:00Z",
    };
    const expectedFormattedValues = formatTaskValue(values);

    expect(expectedFormattedValues.dueDate).toBe(new Date(values.dueDate).toISOString());
  });

  test("sets dueDate to null when not provided", () => {
    const values = { dueDate: null };
    const formatted = formatTaskValue(values);
    expect(formatted.dueDate).toBeNull();
  });
});
