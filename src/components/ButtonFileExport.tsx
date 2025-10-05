import SaveIcon from "@mui/icons-material/Save";
import * as XLSX from "xlsx";
import { Box, Button } from "@mui/material";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const ButtonFileExport = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);
  
  const { data } = useData();
  const fileName = "mctabel";

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook,  `${fileName}.xlsx`)
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
        onClick={exportToExcel}
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
      >
        to Excel
      </Button>
    </Box>
  );
};

export default ButtonFileExport;
