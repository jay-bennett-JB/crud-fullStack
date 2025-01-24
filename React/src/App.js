import { ColorModeContext, useMode } from "./themes";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./scenes/homepage";
import Topbar from "./scenes/global/topbar";
import SidebarSetup from "./scenes/global/sidebar";
import TaskCreatePage from "./scenes/createTask";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarSetup />
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/createTask"
                element={<TaskCreatePage />}
              />
              {/* <Route
                path="/updateTask"
                element={<UpdateTaskPage />}
              /> */}
              {/* <Route
                path="/deleteTasl"
                element={<DeleteTaskPage />}
              /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
