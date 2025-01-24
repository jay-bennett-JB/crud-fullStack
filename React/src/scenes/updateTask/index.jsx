import { Box, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import FullViewTask from "../../components/ViewTask";

//HomePage Setup
const HomePage = () => {
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
        {/* Description  */}
        {/* Small list of Task if any */}
        <Box>
          <FullViewTask />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
