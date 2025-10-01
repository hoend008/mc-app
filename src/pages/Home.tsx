import { Box, Grid, Toolbar } from "@mui/material";
import { drawerWidth } from "../components/Layout";
import DataTable from "../components/DataTable";


const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: { sm: "100%", md: "100%" },
        bgcolor: "primary.main",
      }}
    >
      <Toolbar />
      <Grid container direction="column" spacing={2}>
        <DataTable />
      </Grid>
    </Box>
  );
};

export default Home;
