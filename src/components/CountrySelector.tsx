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
import useData from "../hooks/useData";

const CountrySelector = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get countries
  const { data: countries, error, isLoading } = useCountry(auth.accessToken);

  // update state variable on change
  const { countryID, setCountryID } = useData();

  const handleChange = (event: SelectChangeEvent) => {
    setCountryID(event.target.value);
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="country-select-label" sx={{color: "text.main"}}>Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={countryID}
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
              key={country.id}
              value={country.id}
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
