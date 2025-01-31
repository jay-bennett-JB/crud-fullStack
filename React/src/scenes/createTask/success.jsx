//Imports
import { Box, Typography } from "@mui/material";

//Create Task Page Setup
const SuccessPage = () => {
  return (
    <Box m="20px">
      <Box>
        <Typography
          variant="h2"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ mb: "5px" }}>
          Task has been created
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;
