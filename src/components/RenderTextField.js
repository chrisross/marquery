import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

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
    helperText="Paste HTML code here"
    error={touched && error ? true : false}
    {...input}
    InputProps={{
      className
    }}
    variant="outlined"
    margin="normal"
  />
);

RenderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool
  })
};

export default RenderTextField;
