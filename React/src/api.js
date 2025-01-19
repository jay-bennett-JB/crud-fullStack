//Imports
import axios from "axios";

const API_BASE_URL = "https://localhost:3000";

//Axios Instance
const axiosInstance = axios.create({
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
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

//Create Task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/transactions/", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/transactions/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
