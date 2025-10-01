import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const columns: GridColDef[] = [
  {
    field: "firstname",
    headerName: "First name",
    editable: true,
  },
  {
    field: "lastname",
    headerName: "Last name",
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    editable: true,
  },
];

export interface DataRow {
  lastName: string;
  firstName: string;
  age: number;
}

const DataTable = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);
  
  const { data } = useData();
  
  return (
    <Box sx={{ height: "500px", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.firstname}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 40,
            },
          },
        }}
        pageSizeOptions={[40]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
            backgroundColor: "secondary.main",
            border: 1,
            borderColor: "border.main",
            borderRadius: "0.6rem",
            color: "text.main",
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "secondary.main",
              fontSize: 16,
            },
            "& .MuiDataGrid-row:hover": {
              color: "text.main",
              backgroundColor: "grey",
            },
            "& .MuiDataGrid-sortIcon": {
              opacity: 1,
              color: "text.main",
            },
            "& .MuiDataGrid-menuIconButton": {
              opacity: 1,
              color: "text.main",
            },

            "& ::-webkit-scrollbar": {
              width: "12px",
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: themeColors.neutral.main,
            },
            "& ::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
              backgroundColor: themeColors.accent.main,
            },
            "& ::-webkit-scrollbar-button": {
              borderStyle: "solid",
              height: "12px",
              width: "12px",
            },

            /* Up */
            "& ::-webkit-scrollbar-button:vertical:decrement": {
              borderWidth: "0 7px 12px 7px",
              borderColor:
                "transparent transparent " +
                themeColors.neutral.light +
                " transparent ",
              backgroundColor: themeColors.neutral.main,
            },

            /* Up */
            "& ::-webkit-scrollbar-button:vertical:increment": {
              borderWidth: "12px 7px 0 7px",
              borderColor:
                themeColors.neutral.light +
                " transparent transparent transparent",
              backgroundColor: themeColors.neutral.main,
            },
          }}
      />
    </Box>
  );
};

export default DataTable;
