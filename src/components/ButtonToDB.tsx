import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import postMCDataQueryOptions from "../api/queryOptions/postMCDataQueryOptions";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import postMCData from "../api/queries/postMCData";

const ButtonToDB = () => {
  const { auth } = useAuth();

  const { data: mcdata } = useData();

  const exportToDB = () => {
    const msg = postMCData(auth.accessToken, mcdata);
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
        onClick={exportToDB}
      >
        Send to DB
      </Button>
    </Box>
  );
};

export default ButtonToDB;
