import { Alert, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import useData from "../hooks/useData";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import downloadMCData from "../api/queries/downloadMCData";

const DownloadExcelButton = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get selected SOP
  const { sop } = useData();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error" | "warning">(
    "success"
  );

  const handleDownload = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Call the FastAPI endpoint
      const data = await downloadMCData(auth.accessToken, sop);
      setSeverity("success");
      setMessage("Download initiated successfully!");

      // Create a blob URL and trigger download
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "updated_MCdata.xlsx"; // filename for download
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
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
        onClick={handleDownload}
        startIcon={
          loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <SaveIcon />
          )
        }
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
      >
        {loading ? "Processing..." : "To Excel"}
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

export default DownloadExcelButton;
