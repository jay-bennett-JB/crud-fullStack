// Imports
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} from "../src/api";

describe("API Function Tests", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });
  afterAll(() => {
    mock.restore();
  });
});

test("getTasks fetches all tasks successfully", async () => {
  const mockData = [
    { id: 1, name: "Task 1 " },
    { id: 2, name: "Task 2" },
  ];
  mock.onGet("http://localhost:8000/transactions/").reply(200, mockData);
  const task = await getTasks();
  expect(tasks).toEqual(mockData);
});

test("getSingleTask fetches a single task successfully", async () => {
  const taskName = "Task 1";
  const mockData = { id: 1, name: taskName };
  mock
    .onGet("http://localhost:8000/transactions/", taskName)
    .reply(200, mockData);

  const task = await getSingleTask(taskName);
  expect(task).toEqual(mockData);
});

test("createTask creates a task successfully", async () => {
  const newTask = { name: "New Task", priority: true };
  const mockData = { id: 1, ...newTask };
  mock.onPost("http://localhost:8000/transactions/").reply(201, mockData);

  const createdTask = await createTask(newTask);
  expect(createdTask).toEqual(mockData);
});

test("updateTask updates a task successfully", async () => {
  const updatedTask = { name: "Updated Task", priority: false };
  const mockData = { id: 1, ...updatedTask };
  mock.onPut("http://localhost:8000/transactions/1").reply(200, mockData);

  const result = await updateTask(1, updatedTask);
  expect(result).toEqual(mockData);
});

test("deleteTask deletes a task successfully", async () => {
  mock.onDelete("http://localhost:8000/transactions/1").reply(204);

  const result = await deleteTask(1);
  expect(result).toBeUndefined(); // Axios returns no data for a 204 response
});
