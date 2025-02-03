import React from "react";
import dayjs from "dayjs";

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
    const values = {
      dueDate: dayjs("2025-02-10T00:00:00Z"),
    };
    const expectedFormattedValues = formatTaskValue(values);
    const expectedISO = new Date("2025-02-10T00:00:00Z").toISOString();
    expect(expectedFormattedValues.dueDate).toBe(expectedISO);
  });

  test("sets dueDate to null when not provided", () => {
    const values = { dueDate: null };
    const formatted = formatTaskValue(values);
    expect(formatted.dueDate).toBeNull();
  });
});
