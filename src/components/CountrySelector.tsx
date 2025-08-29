import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createCountriesQueryOptions from "../api/queryOptions/countryQueryOptions";

const CountrySelector = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get countries
  const { data: countries } = useQuery(
    createCountriesQueryOptions(auth.accessToken)
  );

  // update state variable on change
  const { countryCode, setCountryCode } = useData();

  const handleChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value);
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="country-select-label" sx={{ color: "text.main" }}>
          Country
        </InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={countryCode}
          label="Country"
          onChange={handleChange}
          sx={{
            color: "text.main",
            backgroundColor: "secondary.main",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "accent.green",
            },
          }}
        >
          {countries?.map((country) => (
            <MenuItem
              key={country.code3}
              value={country.code3}
              sx={{ color: "text.main", backgroundColor: "secondary.main" }}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelector;
