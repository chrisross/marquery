import React from "react";
import AppNavBar from "./AppNavBar";
import MarqueryPage from "./MarqueryPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import AppFooter from "./AppFooter";

const Profile = props => (
  <div className="Profile page">Profile</div>
);

const Account = props => (
  <div className="Account page">Account</div>
);

const About = props => (
  <div className="About page">About</div>
);

const PageNotFound = ({ location }) => (
  <div className="PageNotFound page">No match found for <code>{location.pathname}</code></div>
);

const LoggedOut = props => (
  <div className="LoggedOut page">You're now logged out</div>
);

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit * 15,
    paddingBottom: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    maxWidth: 1024,
    minHeight: 400,
    margin: 'auto'
  }
});

const profileLinks = [
  { text: 'Profile', route: '/profile' },
  { text: 'My Account', route: '/account' }
];

const App = props => {
  const { classes } = props;
  const auth = true;

  return (
    <div className="App">
      <Router>
        <AppNavBar title="Marquery" profileLinks={profileLinks} auth={auth} />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={MarqueryPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/account/logout" component={LoggedOut} />
            <Route path="/account" component={Account} />
            <Route path="/about" component={About} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
      <AppFooter />
    </div>
  );
};

export default withStyles(styles)(App);
