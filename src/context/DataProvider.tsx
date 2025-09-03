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
  selectedFeature: any;
  setSelectedFeature: Dispatch<any>;
  feedconversionID: number;
  setFeedconversionID: Dispatch<SetStateAction<number>>;
  //selectedData: SampleYear;
  //setSelectedData: Dispatch<SetStateAction<SampleYear>>;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // set state variable that holds country and function to update country
  const [countryCode, setCountryCode] = useState("");

  const [feedconversionID, setFeedconversionID] = useState(0);

  //const [selectedData, setSelectedData] = useState({});

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  // for map
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  return (
    <DataContext.Provider
      value={{
        countryCode,
        setCountryCode,
        selectedFeature,
        setSelectedFeature,
        feedconversionID,
        setFeedconversionID,
        //selectedData,
        //setSelectedData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
