import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <TextField
        autoComplete="off"
        label={label}
        variant="outlined"
        {...field}
        {...props}
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : null}
        style={{ marginTop: "20px" }}
      />
    </>
  );
};
