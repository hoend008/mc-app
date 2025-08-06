import { Box, Toolbar } from "@mui/material";
import { drawerWidth } from "./Layout";
import BarchartYear from "./BarchartYear";

const Home = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <BarchartYear />
    </Box>
  );
};

export default Home;
