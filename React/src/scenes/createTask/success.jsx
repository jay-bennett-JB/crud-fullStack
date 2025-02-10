//Imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../themes";

//Create Task Page Setup
const SuccessPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box>
        <Typography
          variant="h2"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          Task has been created
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
