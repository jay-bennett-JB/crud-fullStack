// Imports
import axios from "../__mocks__/axios";
import { axiosInstance, getTasks } from "../src/api";

//Mock Axios GLobally
jest.mock("axios");

describe("api.js Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getTasks fetches all tasks", async () => {
    //Mock Axios Response
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Task 1", description: "Test task" },
        { id: 2, name: "Task 2", description: "Another test task" },
      ],
    });
    console.debug("Mocked Axios Response: ");

    //Function Call
    const tasks = await getTasks();

    //Assertions
    expect(tasks).toEqual([
      { id: 1, name: "Task 1", description: "Test task" },
      { id: 2, name: "Task 2", description: "Another test task" },
    ]); //Returned data check
  });
  test("getSingleTask fetches single task", async () => {});
  test("createTask posts new task", async () => {});
  test("updateTask updates a task by ID", async () => {});
  test("getTasks fetches a task by ID", async () => {});
  test("handles errors gracefully", async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));
    await expect(getTasks()).rejects.toThrow("Network Error");
    //Verification that axios was called
    expect(axiosInstance.get).toHaveBeenCalledWith("/transactions/");
  });
});
