import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// Main Component
export default function MultipleSelectSpecialty({
  allSpecialties,
  selectedIds,
  setSelectedIds,
}: any) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedIds>) => {
    const {
      target: { value },
    } = event;
    setSelectedIds(
      typeof value === "string" ? value.split(",") : value // Ensure value is always an array
    );
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-multiple-chip-label">Specialties</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedIds || []} // Ensure the value is always an array
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Specialties" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => {
              const specialty = allSpecialties?.data?.find(
                (item: any) => item.id === value
              );
              return specialty ? (
                <Chip key={value} size="small" label={specialty.title} />
              ) : null;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {allSpecialties?.data?.map((specialty: any) => (
          <MenuItem
            key={specialty.id}
            value={specialty.id}
            style={getStyles(specialty.id, selectedIds || [], theme)}
          >
            {specialty.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
