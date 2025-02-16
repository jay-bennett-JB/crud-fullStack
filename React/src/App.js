import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ColorModeContext, useMode } from "./themes";
import HomePage from "./scenes/homepage";
import Topbar from "./scenes/global/topbar";
import SidebarSetup from "./scenes/global/sidebar";
import TaskCreatePage from "./scenes/createTask";
import UpdateTaskPage from "./scenes/updateTask";
import DeleteTaskPage from "./scenes/deleteTask";
import SuccessPage from "./scenes/createTask/success";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SidebarSetup />
            <main className="content">
              <Topbar />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<HomePage />}
                />
                <Route
                  path="/createTask"
                  element={<TaskCreatePage />}
                />
                <Route
                  path="/updateTask"
                  element={<UpdateTaskPage />}
                />
                <Route
                  path="/deleteTask"
                  element={<DeleteTaskPage />}
                />
                <Route
                  path="/success"
                  element={<SuccessPage />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
