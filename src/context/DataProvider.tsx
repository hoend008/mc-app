import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DataContextType {
  countryCode: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  feedconversionID: number;
  setFeedconversionID: Dispatch<SetStateAction<number>>;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // set state variable that holds country and function to update country
  const [countryCode, setCountryCode] = useState("");

  const [feedconversionID, setFeedconversionID] = useState(0);

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  return (
    <DataContext.Provider
      value={{
        countryCode,
        setCountryCode,
        feedconversionID,
        setFeedconversionID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
