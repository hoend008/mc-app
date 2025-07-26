import { useContext } from "react";
import DataContext from "../context/DataProvider";

const useData = () => useContext(DataContext);

export default useData;