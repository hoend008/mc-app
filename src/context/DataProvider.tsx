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
  validsop: boolean;
  setValidsop: (b: boolean) => void;
  invalidSops: string[];
  setInvalidSops: Dispatch<SetStateAction<string[]>>;
  modalOpen: boolean;
  setModalOpen: (b: boolean) => void;
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

  const [validsop, setValidsop] = useState(false)
  const [invalidSops, setInvalidSops] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sop, setSop] = useState<string[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  return (
    <DataContext.Provider
      value={{
        validsop,
        setValidsop,
        invalidSops,
        setInvalidSops,
        modalOpen,
        setModalOpen,
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
