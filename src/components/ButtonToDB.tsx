import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress, Snackbar, Alert, Box } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import postMCData from "../api/queries/postMCData";
import { useQueryClient } from "@tanstack/react-query";

const ButtonToDB = () => {
  const queryClient = useQueryClient();

  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { auth } = useAuth();

  const { data: mcdata, validsop } = useData();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error" | "warning">(
    "success"
  );

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await postMCData(auth.accessToken, mcdata);
      setSeverity("success");
      setMessage("Operation completed successfully!");
      // Tell React Query to refresh dropdown data
      queryClient.invalidateQueries({ queryKey: ["sop"] });
    } catch (error) {
      setSeverity("error");
      setMessage("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={!validsop}
        startIcon={
          loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <SaveIcon />
          )
        }
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "neutral.main",
            color: "text.main", // or whatever you want the disabled text color to be
          },
          color: "text.main",
          border: "1px solid " + themeColors.accent.main,
          width: 180,
        }}
      >
        {loading ? "Processing..." : "To DB"}
      </Button>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setMessage(null)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ButtonToDB;
