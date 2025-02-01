//Imports
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../api";

//Create Task Page Setup
const TaskCreatePage = () => {
  const handleSubmit = (values, actions) => {
    console.log("Form submitted with values:", values);
    createTask(values)
      .then(() => {
        console.log("Task created");
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log("Error creating task:", error);
        actions.setSubmitting(false);
      });
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
          <TaskForm onSubmit={handleSubmit} />
        </Box>
        {/* Submit Button */}
        <Box>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreatePage;
