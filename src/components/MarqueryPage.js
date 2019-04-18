import React, { useState } from "react";
import MarqueryFormContainer from "./MarqueryFormContainer";
import ErrorBoundary from "./ErrorBoundary";
import {
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  Grid,
  withStyles
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { generateOutput } from "../helpers/generateOutput";

const styles = {
  paragraph: { lineHeight: 1.5 },
  heading: { paddingTop: 100, marginBottom: 20 }
};

const MUIDataTableOptions = {
  download: false,
  print: false,
  empty: true,
  sort: true,
  rowsPerPageOptions: [10, 25, 100]
};

const getMuiTheme = ({ columns }) => {
  const theme = {
    overrides: {
      MUIDataTableBodyCell: {
        root: {}
      }
    }
  };
  const columnCount = Object.keys(columns).length;
  const columnWidth = 100 / columnCount;
  if (!isNaN(columnWidth) || isFinite(columnWidth)) {
    theme.overrides.MUIDataTableBodyCell.root.width =
      columnWidth.toFixed(7) + "%";
  }
  return createMuiTheme(theme);
};

const MarqueryPage = props => {
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
    <Grid container>
      <Grid item xs={12}>
        <Typography
          className={props.classes.heading}
          variant="h3"
          component="h1"
        >
          Marquery
        </Typography>
        <Typography variant="subtitle1" className={props.classes.paragraph}>
          {
            "This app analyses the given HTML code for attributes using the given query (this is like a CSS selector or jQuery selector)"
          }
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
      .
      {resultsVisibility && (
        <Grid item xs={12}>
          <MuiThemeProvider
            theme={getMuiTheme({
              columns: outputColumns
            })}
          >
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

export default withStyles(styles)(MarqueryPage);
