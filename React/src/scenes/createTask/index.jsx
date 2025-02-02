//Imports
import React from "react";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../../api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

//Handle Task Creation
// In index.jsx (TaskCreatePage)
export const formatTaskValue = (values) => ({
  ...values,
  dueDate:
    values.dueDate && dayjs.isDayjs(values.dueDate) && values.dueDate.isValid()
      ? values.dueDate.toISOString()
      : null, // Convert Dayjs to ISO
});

//Create Task Page Setup
const TaskCreatePage = () => {
  const navigate = useNavigate();
  const handleCreateTask = async (values, actions) => {
    try {
      const formattedValues = formatTaskValue(values);
      await createTask(formattedValues);
      navigate("/success", { state: { message: "Task created successfully" } });
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <Box m="20px">
      {/* Header */}
      <Box>
        <Header
          title="Create a Task"
          subtitle="Use this form to input and create a task"
        />
        {/*Create a task form*/}
        <Box>
          <TaskForm onSubmit={handleCreateTask} />
        </Box>
        {/* Submit Button */}
        <Box>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            form="task-form"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreatePage;
