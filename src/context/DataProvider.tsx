import { useMediaQuery } from "@mui/material";
import {
  createContext,
  ReactNode,
  useState,
} from "react";
import { DataRow } from "../components/DataTable";

interface DataContextType {
  data: DataRow[];
  setData: (d: DataRow[]) => void;
  setIsLoading: (b: boolean) => void;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {

  const [data, setData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        setIsLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
