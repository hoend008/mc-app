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
import titleCase from "../utils/titleCase";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import createSopQueryOptions from "../api/queryOptions/sampleYearQueryOptions";

const SopSelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get feed food
  const { data } = useQuery(createSopQueryOptions(auth.accessToken));

  const { sop, setSop } = useData();

  const handleSopChange = (e: SelectChangeEvent) => {
    const sop = e.target.value;
    if (sop) {
      setSop(sop);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">SOP</InputLabel>
        <Select
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                color: "text.main",
                background: themeColors.neutral.light,
              },
            },
          }}
          sx={{
            width: 180,
            color: "text.main",
            backgroundColor: "secondary.main",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.accent.main,
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sop ? sop : ""}
          label="SOP"
          onChange={handleSopChange}
        >
          {data?.map((data) => (
            <MenuItem
              key={data.sop}
              value={data.sop}
              sx={{ color: "text.main", backgroundColor: "secondary.main" }}
            >
              {titleCase(data.sop)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SopSelect;
