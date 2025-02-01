//Imports
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../../api";
import { useNavigate } from "react-router-dom";

//Create Task Page Setup
const TaskCreatePage = () => {
  const navigate = useNavigate();

  //Handle Task Creation
  const handleCreateTask = async (values, actions) => {
    try {
      const formatttedValues = {
        ...values,
        dueDate: values.dueDate ? values.due.format("MM-DD-YYYY") : null,
      };
      console.log("Form submitted with values: ", values);
      await createTask(values);
      navigate("/success", { state: { message: "Task created successfully" } });
    } catch (error) {
      console.error(new Error("Failed to create task", error));
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
