import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress, Snackbar, Alert, Box } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import axios from "axios";
import { DataRow } from "./DataTable";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import postMCData from "../api/queries/postMCData";

const ButtonToDB = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { auth } = useAuth();

  const { data: mcdata } = useData();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error" | "warning">("success");

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const controller = new AbortController();
      await postMCData(auth.accessToken, mcdata);
      setSeverity("success");
      setMessage("Operation completed successfully!");
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
        color="secondary"
        onClick={handleClick}
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : <SaveIcon />
        }
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
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
