//Imports
import { Box } from "@mui/material";
import Header from "../../components/Header";
import CreateTaskForm from "../../components/createTaskForm";

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
        {/* Description  */}
        {/* Small list of Task if any */}
        <Box>
          <CreateTaskForm />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreatePage;
