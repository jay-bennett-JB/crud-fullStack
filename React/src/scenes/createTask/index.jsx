//Imports
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

//Create Task Page Setup
const TaskCreatePage = () => {
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
          <TaskForm />
        </Box>
        {/* Submit Button */}
      </Box>
    </Box>
  );
};

export default TaskCreatePage;
