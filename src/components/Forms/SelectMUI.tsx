import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Controller } from "react-hook-form";

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

function getStyles(name: string, selectValues: string[], theme: Theme) {
  return {
    fontWeight:
      selectValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectMUI({
  children,
  label = "name",
  control,
  sxStyle,
}: {
  label?: string;
  control: any;
  children?: any;
  sxStyle?: object;
}) {
  const theme = useTheme();

  return (
    <FormControl>
      <InputLabel id={`multiple-${label}-label`}>{label}</InputLabel>
      <Controller
        name={label}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          return (
            <Select
              labelId={`multiple-${label}-label`}
              id={`multiple-${label}`}
              multiple
              {...field}
              input={<OutlinedInput label={label} />}
              MenuProps={MenuProps}
              sx={sxStyle}
            >
              {children}
            </Select>
          );
        }}
      />
    </FormControl>
  );
}
