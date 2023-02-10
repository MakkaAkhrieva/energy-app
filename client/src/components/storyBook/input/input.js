import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
export const MyTextInput = ({
  label = false,
  variant,
  disabled = false,
  fullWidth = false,
  style = false,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        autoComplete="off"
        label={label}
        variant={variant}
        {...field}
        {...props}
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : null}
        style={style}
        disabled={disabled}
        fullWidth={fullWidth}
      />
    </>
  );
};
