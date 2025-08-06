import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DataContextType {
  countryID: string;
  setCountryID: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // set state variable that holds country and function to update country
  const [countryID, setCountryID] = useState("");

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);
  
  return (
    <DataContext.Provider
      value={{
        countryID,
        setCountryID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
