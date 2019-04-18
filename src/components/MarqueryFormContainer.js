import React from "react";
import {
  FormSection,
  Field,
  reduxForm,
  formValueSelector,
  change
} from "redux-form";
import { connect } from "react-redux";
import { Button, Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { notEmpty } from "../helpers/validate";
import RenderInput from "./RenderInput";
import RenderTextField from "./RenderTextField";
import RenderRadioGroup from "./RenderRadioGroup";
import RenderHiddenInput from "./RenderHiddenInput";
import { RenderHTMLFileUploadButton } from "./RenderFileUploadButton";

const styles = {
  code: {
    fontFamily: "monospace"
  },
  clearButton: {
    marginLeft: 20
  },
  radioGroup: {
    justifyContent: "center",
    flexDirection: "row"
  }
};

let MarqueryForm = props => {
  const {
    chosenCodeInputMethod,
    classes,
    handleSubmit,
    onReset,
    pristine,
    submitting,
    reset,
    initialValues
  } = props;

  const handleReset = () => {
    onReset();
    reset();
  };

  return (
    <form className="marquery-form" onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Field
            name="query"
            label="Query"
            required={true}
            fullWidth={true}
            component={RenderInput}
            validate={[notEmpty]}
            helperText="This can be any CSS selector"
          />
        </Grid>
        <Grid item xs={12}>
          <FormSection name="code">
            <Field
              defaultValue={initialValues.codeInputMethod}
              component={RenderRadioGroup}
              label="Code input method"
              classes={classes.radioGroup}
              name="inputMethod"
              options={[
                { label: "File", value: "file" },
                { label: "Paste", value: "paste" }
              ]}
            />
            {chosenCodeInputMethod === "file" && (
              <>
                <Field
                  required={true}
                  name="file"
                  label="Upload file"
                  uploadSuccess={({ name, data }) => {
                    props.change("code.fileName", name);
                    props.change("code.fileUploadStatus", "success");
                    props.change("code.data", data);
                  }}
                  component={RenderHTMLFileUploadButton}
                />
                {props.codeFileName && <span>File: {props.codeFileName}</span>}
                <Field component={RenderHiddenInput} name="fileName" />
                <Field component={RenderHiddenInput} name="fileUploadStatus" />
                <Field component={RenderHiddenInput} name="data" />
              </>
            )}

            {chosenCodeInputMethod === "paste" && (
              <Field
                name="data"
                label="Code"
                required={true}
                multiline={true}
                className={classes.code}
                rows={8}
                fullWidth={true}
                component={RenderTextField}
                validate={[notEmpty]}
              />
            )}
          </FormSection>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={submitting}
            type="submit"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={pristine || submitting}
            type="reset"
            onClick={handleReset}
            className={classes.clearButton}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

MarqueryForm.propTypes = {
  chosenCodeInputMethod: PropTypes.string,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onReset: PropTypes.func,
  reset: PropTypes.func
};

MarqueryForm = reduxForm({
  form: "MarqueryForm",
  initialValues: {
    code: { inputMethod: "paste" }
  }
})(MarqueryForm);

const selector = formValueSelector("MarqueryForm");
MarqueryForm = connect(
  state => ({
    codeFileName: selector(state, "code.fileName"),
    chosenCodeInputMethod: selector(state, "code.inputMethod")
  }),
  (dispatch, ownProps) => ({
    change: (name, value) => dispatch(change("MarqueryForm", name, value))
  })
)(MarqueryForm);

export default withStyles(styles)(MarqueryForm);
