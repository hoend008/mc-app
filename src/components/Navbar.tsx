import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      color="primary" 
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
        </Box>
        <Typography variant="h6">Title</Typography>
        <Box>
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
