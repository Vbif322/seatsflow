import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  sxStyle?: object;
  rules?: object;
  type?: string;
  size?: "small" | "medium" | undefined;
};

const MUITextField = ({
  name,
  label,
  sxStyle,
  rules,
  type,
  ...props
}: Props) => {
  // console.log(props);
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
          type={type}
          helperText={errors[name] ? `${errors[name]?.message}` : ""}
          sx={sxStyle}
          {...props}
          autoComplete="off"
        />
      )}
    />
  );
};

export default MUITextField;
