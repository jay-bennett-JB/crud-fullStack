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
  console.log("Location state in succes page", location.state);
  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h2"
          color={colors.greenAccent[500]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {message}
        </Typography>
        <Button
          color={colors.greenAccent[500]}
          onClick={() => navigate("/")}
        >
          Back to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
