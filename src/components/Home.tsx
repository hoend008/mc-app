import { Box, Card, Toolbar } from "@mui/material";
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
        bgcolor: "primary.main",
      }}
    >
      <Toolbar />
      <Card
        sx={{
          backgroundColor: "secondary.main",
          border: 1,
          borderColor: "border.main",
          borderRadius: "0.6rem",
        }}
      >
        <BarchartYear />
      </Card>
    </Box>
  );
};

export default Home;
