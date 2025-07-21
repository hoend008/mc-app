import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import EmptyLayout from "./components/EmptyLayout";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={<EmptyLayout />}
            />
            <Route
              path="home"
              element={<Layout mode={mode} handleChange={handleChange} />}
            >
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
