import React from "react";
import { withStyles, Grid, List, ListItem } from "@material-ui/core";

const styles = theme => ({
  root: {
    background: '#333',
    color: 'white',
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2.5
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5
    }
  }
});

const AppFooter = ({ classes }) => (
  <div className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem>
            Github.com
          </ListItem>
        </List>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(AppFooter);
