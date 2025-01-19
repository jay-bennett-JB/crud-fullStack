//Imports
import { AccordionDetails, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

      </Box>
    </Box>
  );
};

export default HomePage;
