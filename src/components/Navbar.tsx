import {
  AppBar,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext, { emptyAuth } from "../context/AuthProvider";
import useTheme from "../hooks/useTheme";

interface Props {
  handleDrawerToggle: () => void;
}

const Navbar = ({ handleDrawerToggle }: Props) => {
  const { setAuth } = useContext(AuthContext);
  const { mode, handleChange } = useTheme();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth(emptyAuth);
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <DashboardIcon
            fontSize="large"
            sx={{
              display: { xs: "none", sm: "block" },
              width: "8rem",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" sx={{ color: "text.main" }} />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ color: "text.main" }}>
          Title
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={handleChange}>
            {mode ? (
              <DarkModeOutlinedIcon sx={{ color: "text.main" }} />
            ) : (
              <LightModeOutlinedIcon sx={{ color: "text.main" }} />
            )}
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon sx={{ color: "text.main" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
