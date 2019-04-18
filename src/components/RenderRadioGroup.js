import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const RenderRadioGroup = ({ defaultValue, input, options, label, classes }) => (
  <FormControl fullWidth={true} component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup className={classes} {...input} defaultValue={defaultValue}>
      {options.map(option => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          label={option.label}
          control={<Radio />}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RenderRadioGroup;
