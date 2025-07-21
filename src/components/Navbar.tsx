import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  handleDrawerToggle: () => void;
}

const Navbar = ({ handleDrawerToggle }: Props) => {
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
          <Box>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
