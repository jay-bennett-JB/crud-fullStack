/* eslint-disable no-undef */
//Imports
import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

//Axios Instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

//Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/transactions/");
    return response.data;
  } catch (error) {
    //Change to pop up at later date.
    console.debug("Error fetching tasks: ", error.message);
    throw new Error(error.message);
  }
};

//SINGLE Transaction Fetch
export const getSingleTask = async (taskID) => {
  try {
    const response = await axiosInstance.get(`/transactions/task/${taskID}`);
    return response.data;
  } catch (error) {
    //Change to pop up at later date.
    console.error("Error fetching single tasks: ", error.message);
    throw new Error(error.message);
  }
};

//Create Task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/transactions/", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task: ", error.message);
    throw new Error(error.message);
  }
};

// Update a task
export const updateTask = async (taskID, taskUpData) => {
  try {
    const response = await axiosInstance.put(`/transactions/task/${taskID}`, taskUpData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw new Error(error.message);
  }
};

// Delete a task
export const deleteTask = async (taskID) => {
  try {
    const response = await axiosInstance.delete(`/transactions/task/${taskID}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw new Error(error.message);
  }
};
