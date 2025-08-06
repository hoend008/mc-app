import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import EmptyLayout from "./components/EmptyLayout";
import { DataProvider } from "./context/DataProvider";
import { themeSettings } from "./theme";
import useTheme from "./hooks/useTheme";

function App() {
  const { mode, handleChange } = useTheme();

  const appTheme = createTheme({
    palette: {
      ...(mode === true ? themeSettings(true) : themeSettings(false)),
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />

          {/* we want to protect these routes */}
          <Route
            element={
              <DataProvider>
                <RequireAuth />
              </DataProvider>
            }
          >
            <Route path="/" element={<EmptyLayout />} />
            <Route path="home" element={<Layout mode={mode} />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
