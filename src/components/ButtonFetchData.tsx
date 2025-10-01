import { Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DataRow } from "./DataTable";
import apiClient from "../services/api-client";

interface Props {
  onFetchData: (d: DataRow[]) => void;
  onIsLoading: (b: boolean) => void;
}

const ButtonFetchData = ({ onFetchData, onIsLoading }: Props) => {

  const fetchGot = () => {
    onIsLoading(true);
    apiClient
      .get<DataRow[]>("/got")
      .then((res) => {
        onFetchData(res.data);
        onIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        onIsLoading(false);
      });
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudDownloadIcon />}
      onClick={fetchGot}
    >
      Fetch Data from DB
    </Button>
  );
};

export default ButtonFetchData;
