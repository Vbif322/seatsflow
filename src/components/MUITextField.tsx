import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = { name: string; label: string; sxStyle?: object; rules?: object };

const MUITextField = ({ name, label, sxStyle, rules, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ref, value } }) => (
        <TextField
          value={value}
          inputRef={ref}
          onChange={onChange}
          label={label}
          variant="outlined"
          error={!!errors[name]}
          //   helperText={errors[name]?.message}
          sx={sxStyle}
          {...props}
          autoComplete="off"
        />
      )}
    />
  );
};

export default MUITextField;
