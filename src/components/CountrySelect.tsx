import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import createCountriesQueryOptions from "../api/queryOptions/countryQueryOptions";

const CountrySelect = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get countries
  const { data: countries } = useQuery(
    createCountriesQueryOptions(auth.accessToken)
  );

  const { selectedFeature, setSelectedFeature, setCountryCode } = useData();

  const handleDistrictChange = (e: SelectChangeEvent) => {
    const iso_a3 = e.target.value;
    console.log(iso_a3);
    //const countryProps = densityData.find((e) => e.iso_a3 === iso_a3);
    //if (countryProps) {
    if (iso_a3) {
      //setSelectedFeature(countryProps);
      setSelectedFeature(iso_a3);
      setCountryCode(iso_a3);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          sx={{
            color: "text.main",
            backgroundColor: "secondary.main",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "accent.green",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            selectedFeature ? selectedFeature : ""
          }
          label="Countries"
          onChange={handleDistrictChange}
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

export default CountrySelect;
