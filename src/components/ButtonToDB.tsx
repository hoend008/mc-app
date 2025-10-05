import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import postMCData from "../api/queries/postMCData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const ButtonToDB = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { auth } = useAuth();

  const { data: mcdata } = useData();

  const exportToDB = () => {
    const msg = postMCData(auth.accessToken, mcdata);
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <Button
        color="secondary"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<SaveIcon />}
        onClick={exportToDB}
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
      >
        Send to DB
      </Button>
    </Box>
  );
};

export default ButtonToDB;
