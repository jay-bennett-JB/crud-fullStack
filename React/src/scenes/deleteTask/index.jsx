import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import SingleTaskView from "../../components/SingleTaskView";
import TaskForm from "../../components/TaskForm";

//Update Task Page Setup
const DeleteTaskPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          <SingleTaskView />
        </Box>
        {/* Form that allows user to enter a call a task */}
        <TaskForm />
      </Box>
      {/* Delete Button */}
      <Box
        display="flex"
        justifyContent="end"
        mt="20px"
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
        >
          Retrieve task
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteTaskPage;
