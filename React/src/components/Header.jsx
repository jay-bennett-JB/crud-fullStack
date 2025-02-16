// Imports for Header
import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

import { tokens } from "../themes";

// Header

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      ></Typography>
      {title}
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

// Export
export default Header;
