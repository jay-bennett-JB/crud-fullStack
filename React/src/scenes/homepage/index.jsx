//Imports
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import FullViewTask from "../../components/ViewTask";

//HomePage Setup
const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <FullViewTask />
      </Box>
    </Box>
  );
};

export default HomePage;
