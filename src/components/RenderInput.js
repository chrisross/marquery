import React from "react";
import {
  FormHelperText,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";

const RenderInput = ({
  required,
  input,
  meta: { error, touched },
  multiline,
  classes,
  rows,
  fullWidth,
  label,
  helperText
}) => (
  <FormControl
    required={required}
    fullWidth={fullWidth}
    error={touched && error ? true : false}
  >
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Input
      id={input.name}
      {...input}
      aria-describedby={`${input.name}-error-text ${input.name}-advice-text`}
      multiline={multiline}
      rows={rows}
      className={classes}
    />
    {touched && error && (
      <FormHelperText id={`${input.name}-error-text`}>{error}</FormHelperText>
    )}
    {helperText && (
      <FormHelperText id={`${input.name}-advice-text`}>
        {helperText}
      </FormHelperText>
    )}
  </FormControl>
);

export default RenderInput;
