// Imports
import axios from "axios";

import {
  axiosInstance,
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../src/api";

describe("api.js Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("getTasks fetches all tasks", async () => {
    //Mock Axios Response
    axiosInstance.get.mockResolvedValueOnce({
      data: [
        {
          taskID: 1,
          name: "Task 1",
          description: "Test task",
          dueDate: "Test date",
          priority: false,
        },
        {
          taskID: 1,
          name: "Task 2",
          description: "Test task 2",
          dueDate: "Test date 2",
          priority: false,
        },
      ],
    });

    //Function Call
    const tasks = await getTasks();

    //Assertions
    //Returned data check
    expect(tasks).toEqual([
      {
        taskID: 1,
        name: "Task 1",
        description: "Test task",
        dueDate: "Test date",
        priority: false,
      },
      {
        taskID: 1,
        name: "Task 2",
        description: "Test task 2",
        dueDate: "Test date 2",
        priority: false,
      },
    ]);
    //Correct URL Check
    expect(axiosInstance.get).toHaveBeenCalledWith("/transactions/");
  });

  //getSingleTask
  test("getSingleTask fetches single task", async () => {
    //Mock Axios Response
    const taskData = {
      taskID: 1,
      name: "Task 1",
      description: "Test task",
      dueDate: "Test date",
      priority: false,
    };

    axiosInstance.get.mockResolvedValueOnce({ data: taskData });

    //Function Call
    const task = await getSingleTask(taskData.taskID);
    expect(task.taskID).toEqual(taskData.taskID);

    //Verify that axios.get was called with the correct URL
    expect(axiosInstance.get).toHaveBeenCalledWith(`/transactions/${taskData.taskID}`);
  });

  //CreateTask
  test("createTask posts new task", async () => {
    //Test Data and Mock Axios Response
    const taskNewData = {
      taskID: 1,
      name: "New Task",
      description: "Test task",
      dueDate: "Test date",
      priority: false,
    };

    axiosInstance.post.mockResolvedValueOnce({ data: taskNewData });

    //Function Call
    const createdTask = await createTask(taskNewData);

    //Assertions
    expect(createdTask).toEqual(taskNewData);

    //Verify axios post
    expect(axiosInstance.post).toHaveBeenCalledWith("/transactions/", taskNewData);
  });

  //Update Test
  test("updateTask updates a task by taskID", async () => {
    //Test Data and Mock Axios Response
    const taskID = 1;
    const updatedData = {
      taskID: 1,
      name: "New Task",
      description: "Test task",
      dueDate: "Test date",
      priority: false,
    };

    axiosInstance.put.mockResolvedValueOnce({ data: updatedData });

    //Function Call
    const task = await updateTask(taskID, updatedData);

    //Assertions
    expect(task.taskID).toEqual(updatedData.taskID);
    expect(task.name).toEqual(updatedData.name);
    expect(task.description).toEqual(updatedData.description);

    //Verify axios put
    expect(axiosInstance.put).toHaveBeenCalledWith(`/transactions/${taskID}`, updatedData);
  });

  //Delete Test
  test("Delete fetches a task by ID and deletes", async () => {
    //Test Data and Mock Axios Response
    const taskID = 1;
    const deletedTask = { message: "Task deleted succesfully" };

    axiosInstance.delete.mockResolvedValueOnce({ data: deletedTask });

    //Function Call
    const removedTask = await deleteTask(taskID);
    //Assertions
    expect(removedTask.message).toEqual(deletedTask.message);

    //Verify axios put
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/transactions/${taskID}`);
  });

  //Error Tests
  test("getTask() handles errors gracefully", async () => {
    // Mock Axios to reject with an error
    axiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

    // Ensure that calling getTask() with any data throws the correct error
    await expect(getTasks()).rejects.toThrow("Network Error");

    //Verification that axios was called
    expect(axiosInstance.get).toHaveBeenCalledWith("/transactions/");
  });
  test("getSingleTask() handles errors gracefully", async () => {
    // Mock Axios to reject with an error
    axiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

    // Ensure that calling createTask with any data throws the correct error
    await expect(getSingleTask("1")).rejects.toThrow("Network Error");

    //Verification that axios was called
    expect(axiosInstance.get).toHaveBeenCalledWith(`/transactions/1`);
  });
  test("createTask handles errors gracefully", async () => {
    // Mock Axios to reject with an error
    axiosInstance.post.mockRejectedValueOnce(new Error("Network Error"));

    // Ensure that calling createTask with any data throws the correct error
    await expect(
      createTask({
        name: "New Task",
      })
    ).rejects.toThrow("Network Error");

    // Verify that axiosInstance.post was called with the correct arguments
    expect(axiosInstance.post).toHaveBeenCalledWith("/transactions/", {
      name: "New Task",
    });
  });
  test("updateTask handles errors gracefull", async () => {
    // Mock Axios to reject with an error
    axiosInstance.put.mockRejectedValueOnce(new Error("Network Error"));

    // Ensure that calling createTask with any data throws the correct error
    await expect(updateTask(1, { name: "Task" })).rejects.toThrow("Network Error");

    // Verify that axiosInstance.post was called with the correct arguments
    expect(axiosInstance.put).toHaveBeenCalledWith("/transactions/1", {
      name: "Task",
    });
  });
  test("deleteTask handles errors gracefull", async () => {
    // Mock Axios to reject with an error
    axiosInstance.delete.mockRejectedValueOnce(new Error("Network Error"));

    // Ensure that calling createTask with any data throws the correct error
    await expect(deleteTask(1)).rejects.toThrow("Network Error");

    // Verify that axiosInstance.post was called with the correct arguments
    expect(axiosInstance.delete).toHaveBeenCalledWith("/transactions/1");
  });
});
