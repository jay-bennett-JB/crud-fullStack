//Imports
import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../themes";
import { getSingleTask, updateTask } from "../../api";
import Header from "../../components/Header";
import SingleTaskView from "../../components/SingleTaskView";
import TaskForm from "../../components/TaskForm";

//Update Task Page Setup
const UpdateTaskPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Input for Task ID Field and Store fetched task
  const [taskID, setTaskID] = useState("");
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();

  //Fetch Task by ID
  const handleFetchTask = async () => {
    try {
      const data = await getSingleTask(taskID);
      setTaskData(data);
    } catch (error) {
      console.error(new Error("Failed to fetch task", error));
    }
  };

  //Update Task - Commentted out for TaskViewForm to included later down the road.
  const handleUpdateTask = async (updatedValue) => {
    try {
      await updateTask(taskID, updatedValue);
      navigate("/success", { state: { message: "Task updated successfully" } });
    } catch (error) {
      console.error(new Error("Failed to update Task", error));
    }
  };

  return (
    <Box m="30px">
      {/* Header */}
      <Box>
        <Header
          title="Update a Task"
          subtitle="Update a Task from created and stored tasks."
        />
        {/* Single Task View list based on using form below to submit task ID to field  */}
        <Box>
          <TextField
            data-testid="task-id-input"
            label="Task ID"
            variant="outlined"
            value={taskID}
            onChange={(e) => setTaskID(e.target.value)}
          />
          <Button
            onClick={handleFetchTask}
            color="secondary"
            variant="contained"
          >
            Retrieve task
          </Button>
        </Box>
        {/* Form that allows user to enter a call a task */}
        {taskData && (
          <>
            <SingleTaskView taskID={taskID} />
            <TaskForm onSubmit={handleUpdateTask} />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              form="task-form"
              data-testid="submit-btn"
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UpdateTaskPage;
