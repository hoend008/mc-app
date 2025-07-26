import { Box, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "./Layout";
import CountryDiv from "./CountryDiv";
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
      <CountryDiv />
      <BarchartYear />
    </Box>
  );
};

export default Home;
