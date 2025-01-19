import { ColorModeContext, useMode } from "./themes";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./scenes/homepage";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                exact
                path="/"
                element={<HomePage />}
              />
              {/* <Route
                path="/createTask/"
                element={<ProjectsBox />}
              /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
