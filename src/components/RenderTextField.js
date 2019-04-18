import React from "react";
import { TextField } from "@material-ui/core";

const RenderTextField = ({
  input,
  label,
  required,
  className,
  multiline,
  fullWidth,
  placeholder,
  rows,
  meta: { error, touched }
}) => (
  <TextField
    label={label}
    required={required}
    multiline={multiline}
    rows={rows}
    placeholder={placeholder}
    fullWidth={fullWidth}
    className={className}
    helperText="Paste HTML code here"
    error={touched && error ? true : false}
    {...input}
    variant="outlined"
    margin="normal"
  />
);

export default RenderTextField;
