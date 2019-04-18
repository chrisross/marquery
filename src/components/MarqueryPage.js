import React, { useState } from "react";
import MarqueryFormContainer from "./MarqueryFormContainer";
import ErrorBoundary from "./ErrorBoundary";
import {
  Typography,
  Grid,
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { generateOutput } from "../helpers/generateOutput";

const styles = theme => ({
  paragraph: {
    lineHeight: 1.5
  },
  heading: {
    marginBottom: theme.spacing.unit * 2.5
  },
  tableWrapper: {
    marginTop: theme.spacing.unit * 5
  }
});

const MUIDataTableOptions = {
  empty: true,
  sort: true,
  responsive: 'scroll',
  rowsPerPageOptions: [10, 25, 100]
};

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: 'inherit'
      }
    }
  }
});

const MarqueryPage = props => {
  const { classes } = props;
  const [outputData, setOutputData] = useState([]);
  const [outputColumns, setOutputColumns] = useState([]);
  const [resultsVisibility, setResultsVisibility] = useState(false);

  const handleSubmit = ({ code, query }) => {
    const { fields, data } = generateOutput(code.data, query);
    setOutputData(data);
    setOutputColumns(fields);
    setResultsVisibility(true);
  };

  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <Typography
          className={classes.heading}
          variant="h3"
          component="h1"
        >
          Marquery
        </Typography>
        <Typography paragraph variant="subtitle1" className={classes.paragraph}>
           This app analyses the given HTML code for attributes using the given query, this is like a CSS selector or jQuery selector.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ErrorBoundary>
          <MarqueryFormContainer
            onSubmit={handleSubmit}
            onReset={() => setResultsVisibility(false)}
          />
        </ErrorBoundary>
      </Grid>
      {resultsVisibility && (
        <Grid item xs={12} className={classes.tableWrapper}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title="Results"
              data={outputData}
              columns={outputColumns}
              options={MUIDataTableOptions}
            />
          </MuiThemeProvider>
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(MarqueryPage);
