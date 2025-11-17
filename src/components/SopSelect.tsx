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
import createSopQueryOptions from "../api/queryOptions/SOPQueryOptions";

const SopSelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  const { sop, setSop } = useData();

  // get sop data
  const { data } = useQuery(createSopQueryOptions(auth.accessToken));

  const handleSopChange = (e: SelectChangeEvent<string[]>) => {
    const sop = e.target.value;
    if (sop) {
      setSop(sop as string[]);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">SOP</InputLabel>
        <Select
          multiple
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  color: "text.main",
                  backgroundColor: "secondary.main", // default bg
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: themeColors.accent.main, // selected bg
                  color: "text.main",
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                "& .MuiMenuItem-root.Mui-focusVisible": {
                  backgroundColor: "secondary.main", // focused item bg
                  color: "text.main",
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                mt: 0,
                pt: 0,
                pb: 0,

                "& .MuiMenu-list, & .MuiList-root": {
                  pt: 0,
                  pb: 0,
                },

                // optional: remove pseudo elements or shadows
                "&::before, &::after": {
                  display: "none",
                },
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
            <MenuItem key={data.sop} value={data.sop}>
              {titleCase(data.sop)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SopSelect;
