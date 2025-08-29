import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useData from "../hooks/useData";

const CountrySelect = () => {
  const { selectedFeature, handleDistrictChange, densityData } = useData();

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
            selectedFeature?.iso_a3 ? selectedFeature?.iso_a3.toLowerCase() : ""
          }
          label="Countries"
          onChange={handleDistrictChange}
        >
          {densityData.map((c) => (
            <MenuItem
              value={c.iso_a3.toLowerCase()}
              sx={{
                color: "text.main",
                backgroundColor: "secondary.main",
              }}
            >
              {c.iso_a3.toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelect;
