import { Box, Toolbar } from "@mui/material";
import { drawerWidth } from "./Layout";
import BarchartYear from "./BarchartYear";

const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: "100dvh",
        bgcolor: "neutral.light",
      }}
    >
      <Toolbar />
      <BarchartYear />
    </Box>
  );
};

export default Home;
