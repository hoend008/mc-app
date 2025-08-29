import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import densityData from "../data/testdata.json";

interface Density {
  iso_a3: string;
  density: number;
}

interface DataContextType {
  countryID: string;
  setCountryID: Dispatch<SetStateAction<string>>;
  selectedFeature: any;
  setSelectedFeature: Dispatch<any>;
  handleDistrictChange: (e: SelectChangeEvent) => void;
  densityData: Density[];
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

  // for map
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const handleDistrictChange = (e: SelectChangeEvent) => {
    const iso_a3 = e.target.value;
    console.log(iso_a3);
    const countryProps = densityData.find((e) => e.iso_a3 === iso_a3);
    if (countryProps) {
      setSelectedFeature(countryProps);
    } else {
      return;
    }
  };

  return (
    <DataContext.Provider
      value={{
        countryID,
        setCountryID,
        selectedFeature,
        setSelectedFeature,
        handleDistrictChange,
        densityData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
