import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DataContextType {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // set state variable that holds country and function to update country
  const [country, setCountry] = useState("");

  return (
    <DataContext.Provider
      value={{
        country,
        setCountry
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
