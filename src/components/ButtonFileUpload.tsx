import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import { DataRow } from "./DataTable";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { useQuery } from "@tanstack/react-query";
import createSopFromUserQueryOptions from "../api/queryOptions/SOPFromUserQueryOptions";
import useAuth from "../hooks/useAuth";

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

const ButtonFileUpload = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { setData, setIsLoading, setValidsop } = useData();

  // get user authentication data
  const { auth } = useAuth();

  const { data: sops } = useQuery(
    createSopFromUserQueryOptions(auth.accessToken)
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const reader = new FileReader();
    if (!e.target.files) return;
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      if (!e.target) return;
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      const sheetName = "Input";
      const sheet = workbook.Sheets[sheetName];
      let parsedData = XLSX.utils.sheet_to_json<DataRow>(sheet, {
        blankrows: false,
        defval: null,
      });

      // cleanup (in case some blanks slip through)
      parsedData = parsedData.filter((row) =>
        Object.values(row).some(
          (v) => v !== null && v !== undefined && v !== ""
        )
      );

      // remove first line
      parsedData = parsedData.slice(1);

      // Format all Date objects using toISOString (yyyy-mm-ddTHH:MM:SS.sssZ)
      let formattedData = parsedData.map((row) => {
        const newRow: { [key: string]: any } = { ...row };
        Object.keys(newRow).forEach((key) => {
          const value = newRow[key];
          if (value instanceof Date) {
            // Shorten ISO string to "yyyy-mm-dd" or "yyyy-mm-dd HH:MM:SS"
            const iso = value.toLocaleDateString("en-CA").split("T")[0];
            newRow[key] = iso;
          }
        });
        return newRow;
      });

      // now check sops in data with sops from user
      const sopsData = Array.from(
        new Set(formattedData.map((item) => item.anmethodref.toLowerCase()))
      );

      const sopsUser = Array.from(
        new Set(sops?.map((item) => item.sop.toLowerCase()))
      );

      const allInUser = sopsData.every((value) => sopsUser.includes(value));

      setValidsop(allInUser);
      setData(formattedData as DataRow[]);
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
        sx={{ border: "1px solid " + themeColors.accent.main, width: 180 }}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileUpload} multiple />
      </Button>
    </Box>
  );
};

export default ButtonFileUpload;
