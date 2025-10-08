import {
  Box,
  Drawer,
  Divider,
  Toolbar,
  Stack,
  Typography,
} from "@mui/material";
import ButtonFileUpload from "./ButtonFileUpload";
import DownloadExcelButton from "./DownloadExcelButton";
import ButtonToDB from "./ButtonToDB";
import SopSelect from "./SopSelect";

export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

const Sidebar = ({
  window,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: Props) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box sx={{ bgcolor: "primary.main", height: "100dvh" }}>
      <Stack spacing={4} alignItems="center">
        <Toolbar />{" "}
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ color: "text.main" }}>
            To Database
          </Typography>
          <ButtonFileUpload />
          <ButtonToDB />
        </Stack>
        <Stack spacing={2}>
        <Divider sx={{ borderBottomWidth: 3, borderColor: "text.main" }}/>
          <Typography variant="h4" sx={{ color: "text.main" }}>
            Download
          </Typography>
          <SopSelect />
          <DownloadExcelButton />
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <Box
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: "primary.main",
      }}
      aria-label="mailbox folders"
    >
      <Toolbar />
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderColor: "neutral.main",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
