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
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext, { emptyAuth } from "../context/AuthProvider";
import useTheme from "../hooks/useTheme";

interface Props {
  handleDrawerToggle: () => void;
  mode: boolean;
}

const Navbar = ({ handleDrawerToggle, mode }: Props) => {
  const { setAuth } = useContext(AuthContext);
  const { handleChange } = useTheme();
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
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="h6">Title</Typography>
        <Box sx={{ display: "flex" }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={mode} onChange={handleChange} />}
              label="Dark mode"
            />
          </FormGroup>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
