// Imports
import { useState } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../themes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// Item Setup
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        style={{
          color:
            selected === title ? colors.greenAccent[500] : colors.grey[100],
        }}
        to={to}
        icon={icon}>
        <Typography> {title} </Typography>
      </MenuItem>
    </Link>
  );
};

// Sidebar Setup
const SidebarSetup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("homepage");
  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor="transparent !important"
        rootStyles={{
          [`.${menuClasses.inner}`]: { backgroundColor: colors.primary[500] },
        }}>
        <Menu
          menuItemStyles={{
            button: {
              padding: "5px 35px 5px 20px",
              "&:hover": {
                color: "#868dfb",
              },
              "&.active": {
                color: "#6870fa",
              },
            },
            icon: {
              backgroundColor: "transparent",
            },
          }}>
          {/* Name and other details */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  Task CRUD App
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* Name */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0 " }}>
                  App Menu
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="HomePage"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create a Task"
              to="/createTask"
              icon={<TaskOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update a Task"
              to="/updateTask"
              icon={<TaskOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Delete a Task"
              to="/deleteTask"
              icon={<TaskOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarSetup;
