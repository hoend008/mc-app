import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import { DataRow } from "./DataTable";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonFileImport = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { setData, setIsLoading } = useData();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const reader = new FileReader();
    if (!e.target.files) return;
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      if (!e.target) return;
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json<DataRow>(sheet, {defval: null});
      setData(parsedData);
      setIsLoading(false);
    };
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ border: "1px solid " + themeColors.accent.main }}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} multiple />
      </Button>
    </Box>
  );
};

export default ButtonFileImport;
