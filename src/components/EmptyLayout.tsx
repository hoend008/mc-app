import { Outlet } from "react-router";
import { Box } from "@mui/material";

const EmptyLayout = () => {
  // show navbar when user is logged in (don't show on login page when user not yet logged in)
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default EmptyLayout;
