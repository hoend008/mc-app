import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import useData from "../hooks/useData";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const DownloadExcelButton = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get selected SOP
  const { sop } = useData();

  const handleDownload = async () => {
    const controller = new AbortController();
    try {
      // Call the FastAPI endpoint
      const response = await axios(
        "http://127.0.0.1:8000/mcdata/download/",
        {
          method: "GET",
          responseType: "blob",
          signal: controller.signal,
          headers: { Authorization: "Bearer " + auth.accessToken },
          params: {
            sop: sop
          }
        }
      );

      //if (!response.ok) {
      //  throw new Error(`HTTP error! Status: ${response.status}`);
      //}

      // Convert response to a blob
      //const blob = await response.blob();
          // Create a blob URL and trigger download
      const blob = new Blob([response.data], {
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
      console.error("Failed to download Excel file:", error);
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownload}
        startIcon={<SaveIcon />}
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
        
      >
        To Excel
      </Button>
    </Box>
  );
};

export default DownloadExcelButton;
