import { SelectChangeEvent } from "@mui/material";
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

const DataContext = createContext<DataContextType>({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // set state variable that holds country and function to update country
  const [countryID, setCountryID] = useState("");

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
