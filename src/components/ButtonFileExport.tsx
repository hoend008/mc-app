import { saveAs } from "file-saver";
import SaveIcon from "@mui/icons-material/Save";
import * as XLSX from "xlsx";
import { DataRow } from "./DataTable";
import { Button } from "@mui/material";

interface Props {
  data: DataRow[];
  fileName: string;
}

const ButtonFileExport = ({ data, fileName }: Props) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Button
      color="secondary"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<SaveIcon />}
      onClick={exportToExcel}
    >
      Export to Excel
    </Button>
  );
};

export default ButtonFileExport;
