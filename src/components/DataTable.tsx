import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";

const columns: GridColDef[] = [
  { field: "team_id", headerName: "team_id", type: "number", editable: true },
  {
    field: "identifier",
    headerName: "identifier",
    type: "number",
    editable: true,
  },
  { field: "mutation_date", headerName: "mutation_date", editable: true },
  { field: "insert_date", headerName: "insert_date", editable: true },
  { field: "val_report_name", headerName: "val_report_name", editable: true },
  { field: "val_report_date", headerName: "val_report_date", editable: true },
  {
    field: "plan_nvwa_year",
    headerName: "plan_nvwa_year",
    type: "number",
    editable: true,
  },
  { field: "groupori", headerName: "groupori", editable: true },
  { field: "use", headerName: "use", editable: true },
  { field: "productgroup", headerName: "productgroup", editable: true },
  { field: "sample_matrix", headerName: "sample_matrix", editable: true },
  {
    field: "e02_sampmatcode1_en",
    headerName: "e02_sampmatcode1_en",
    editable: true,
  },
  {
    field: "e02_sampmatcode1_nl",
    headerName: "e02_sampmatcode1_nl",
    editable: true,
  },
  {
    field: "e02_sampmatcode2_en",
    headerName: "e02_sampmatcode2_en",
    editable: true,
  },
  {
    field: "e02_sampmatcode2_nl",
    headerName: "e02_sampmatcode2_nl",
    editable: true,
  },
  {
    field: "e02_sampmatcode3_en",
    headerName: "e02_sampmatcode3_en",
    editable: true,
  },
  {
    field: "e02_sampmatcode3_nl",
    headerName: "e02_sampmatcode3_nl",
    editable: true,
  },
  {
    field: "e02_sampmatcode4_en",
    headerName: "e02_sampmatcode4_en",
    editable: true,
  },
  {
    field: "e02_sampmatcode4_nl",
    headerName: "e02_sampmatcode4_nl",
    editable: true,
  },
  {
    field: "productmatrix_code",
    headerName: "productmatrix_code",
    editable: true,
  },
  { field: "mtx_code", headerName: "mtx_code", editable: true },
  { field: "substance_group", headerName: "substance_group", editable: true },
  {
    field: "antibiotica_ab_groep",
    headerName: "antibiotica_ab_groep",
    editable: true,
  },
  { field: "param_code", headerName: "param_code", editable: true },
  { field: "param_name", headerName: "param_name", editable: true },
  { field: "paramtext_lims", headerName: "paramtext_lims", editable: true },
  {
    field: "paramtext_abbreviation",
    headerName: "paramtext_abbreviation",
    editable: true,
  },
  { field: "paramtype_code", headerName: "paramtype_code", editable: true },
  { field: "paramtype_name", headerName: "paramtype_name", editable: true },
  { field: "anmethodref", headerName: "anmethodref", editable: true },
  { field: "anmethodref_new", headerName: "anmethodref_new", editable: true },
  {
    field: "flex_scope_no",
    headerName: "flex_scope_no",
    type: "number",
    editable: true,
  },
  { field: "qual_quan_method", headerName: "qual_quan_method", editable: true },
  { field: "anlytyp_code", headerName: "anlytyp_code", editable: true },
  { field: "anlytyp_name", headerName: "anlytyp_name", editable: true },
  { field: "anlymd_code", headerName: "anlymd_code", editable: true },
  { field: "anlymd_name", headerName: "anlymd_name", editable: true },
  { field: "mdacc_code", headerName: "mdacc_code", editable: true },
  { field: "mdacc_name", headerName: "mdacc_name", editable: true },
  { field: "resinfo", headerName: "resinfo", editable: true },
  { field: "resunit_wfsr", headerName: "resunit_wfsr", editable: true },
  { field: "unit_code", headerName: "unit_code", editable: true },
  { field: "exprres_code", headerName: "exprres_code", editable: true },
  { field: "lod", headerName: "lod", type: "number", editable: true },
  { field: "loq", headerName: "loq", type: "number", editable: true },
  { field: "ccalpha", headerName: "ccalpha", type: "number", editable: true },
  { field: "ccbeta", headerName: "ccbeta", type: "number", editable: true },
  {
    field: "resvaluncert",
    headerName: "resvaluncert",
    type: "number",
    editable: true,
  },
  {
    field: "evallowlimit",
    headerName: "evallowlimit",
    type: "number",
    editable: true,
  },
  {
    field: "actionlevel",
    headerName: "actionlevel",
    type: "number",
    editable: true,
  },
  { field: "lmttyp_code", headerName: "lmttyp_code", editable: true },
  { field: "lmttyp_name", headerName: "lmttyp_name", editable: true },
  { field: "confirmation_sop", headerName: "confirmation_sop", editable: true },
  { field: "lu_s_productid", headerName: "lu_s_productid", editable: true },
  { field: "matrix_cal_curve", headerName: "matrix_cal_curve", editable: true },
  { field: "measuring_range", headerName: "measuring_range", editable: true },
  {
    field: "trueness_j_recovery",
    headerName: "trueness_j_recovery",
    type: "number",
    editable: true,
  },
  { field: "rsdr", headerName: "rsdr", type: "number", editable: true },
  {
    field: "rsdwr_rsdrl",
    headerName: "rsdwr_rsdrl",
    type: "number",
    editable: true,
  },
  { field: "remarks", headerName: "remarks", editable: true },
];

export interface DataRow {
  team_id: number;
  identifier: number;
  mutation_date: string;
  insert_date: string;
  val_report_name: string;
  val_report_date: string;
  plan_nvwa_year: number;
  groupori: string;
  use: string;
  productgroup: string;
  sample_matrix: string;
  e02_sampmatcode1_en: string;
  e02_sampmatcode1_nl: string;
  e02_sampmatcode2_en: string;
  e02_sampmatcode2_nl: string;
  e02_sampmatcode3_en: string;
  e02_sampmatcode3_nl: string;
  e02_sampmatcode4_en: string;
  e02_sampmatcode4_nl: string;
  productmatrix_code: string;
  mtx_code: string;
  substance_group: string;
  antibiotica_ab_groep: string;
  param_code: string;
  param_name: string;
  paramtext_lims: string;
  paramtext_abbreviation: string;
  paramtype_code: string;
  paramtype_name: string;
  anmethodref: string;
  anmethodref_new: string;
  flex_scope_no: number;
  qual_quan_method: string;
  anlytyp_code: string;
  anlytyp_name: string;
  anlymd_code: string;
  anlymd_name: string;
  mdacc_code: string;
  mdacc_name: string;
  resinfo: string;
  resunit_wfsr: string;
  unit_code: string;
  exprres_code: string;
  lod: number;
  loq: number;
  ccalpha: number;
  ccbeta: number;
  resvaluncert: number;
  evallowlimit: number;
  actionlevel: number;
  lmttyp_code: string;
  lmttyp_name: string;
  confirmation_sop: string;
  lu_s_productid: string;
  matrix_cal_curve: string;
  measuring_range: string;
  trueness_j_recovery: number;
  rsdr: number;
  rsdwr_rsdrl: number;
  remarks: string;
}

const DataTable = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const { data, isLoading } = useData();

  if (isLoading)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <CircularProgress color="success" size="5rem" />
      </div>
    );

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.identifier}
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
          "& .MuiTablePagination-root": {
            color: "text.main", // changes the pagination text color
          },
          "& .MuiTablePagination-actions button": {
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

          /* LEFT */
          "& ::-webkit-scrollbar-button:horizontal:decrement": {
            borderWidth: "7px 12px 7px 0",
            borderColor:
              "transparent " +
              themeColors.neutral.light +
              " transparent transparent ",
            backgroundColor: themeColors.neutral.main,
          },

          /* RIGHT */
          "& ::-webkit-scrollbar-button:horizontal:increment": {
            borderWidth: "7px 0 7px 12px",
            borderColor:
              " transparent transparent transparent" +
              themeColors.neutral.light,
            backgroundColor: themeColors.neutral.main,
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
