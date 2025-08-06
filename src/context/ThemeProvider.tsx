import { useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ThemeContextType {
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  prefersDarkMode: boolean;
  handleChange: () => void;
}

const ThemeContext = createContext({} as ThemeContextType);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        prefersDarkMode,
        handleChange
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
