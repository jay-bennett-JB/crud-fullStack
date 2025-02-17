//Imports
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import FullViewTaskList from "../../components/ViewTask";

//HomePage Setup
const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="50px">
      {/* Header */}
      <Box>
        <Header
          title="Homepage"
          subtitle="For full list of tasks please see the view page"
        />
        {/* Description  */}
        {/* Small list of Task if any */}
        <Box>
          <FullViewTaskList />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
