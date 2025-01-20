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
          title="Homepage"
          subtitle="For full list of tasks please see the view page"
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
