import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RenderCheckbox = ({ input: { name, value, onChange } }) => (
  <FormControlLabel
    label={name}
    control={
      <Checkbox onChange={onChange} checked={value} value={name} name={name} />
    }
  />
);

export default RenderCheckbox;
