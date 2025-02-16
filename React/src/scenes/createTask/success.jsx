//Imports
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../themes";

//Create Task Page Setup
const SuccessPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Operation successfull";
  return (
    <Box m="20px">
      <Box>
        <Typography
          variant="h2"
          color={colors.primary[500]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {message}
        </Typography>
        <Button onClick={() => navigate("/")}>Back to Home Page</Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
