import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useCountry from "../hooks/useCountry";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useData from "../hooks/useData";

const CountrySelector = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get countries
  const { data: countries, error, isLoading } = useCountry(auth.accessToken);

  // set state variable that holds country and function to update country
  const { country, setCountry } = useData();

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {countries?.map((country) => (
            <MenuItem key={country.id} value={country.country}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelector;
