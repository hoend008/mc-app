import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import apiClient from "../services/api-client";
import { DataRow } from "./DataTable";

interface Props {
  data: DataRow[];
  onIsLoading: (b: boolean) => void;
}

const ButtonToDB = ({ data, onIsLoading }: Props) => {
  const exportToDB = () => {
    onIsLoading(true);
    apiClient
      .post<DataRow[]>("/got", data)
      .then((res) => {
        console.log(res);
        console.log(data);
        onIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        onIsLoading(false);
      });
  };

  return (
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
  );
};

export default ButtonToDB;
