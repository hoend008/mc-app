import { useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { DataRow } from "../components/DataTable";

interface DataContextType {
  sop: string[];
  setSop: Dispatch<SetStateAction<string[]>>;
  data: DataRow[];
  setData: (d: DataRow[]) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {

  const [sop, setSop] = useState<string[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  return (
    <DataContext.Provider
      value={{
        sop,
        setSop,
        data,
        setData,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
