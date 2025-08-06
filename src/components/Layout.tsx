import { useState } from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  mode: boolean;
}

const Layout = ({ window, mode }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar handleDrawerToggle={handleDrawerToggle} mode={mode}/>
      <Sidebar
        window={window}
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
