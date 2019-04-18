import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AppBarProfileMenu from './AppBarProfileMenu';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  title: {
    textAlign: 'left'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawer: {
    width: 240,
    height: '100%'
  }
});

const AppNavBar = props => {
  const { classes, title, profileLinks, auth } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleDrawerToggle}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          PaperProps={{
            className: classes.drawer
          }}
          variant="temporary"
          classes={classes.drawer}
          onClose={handleDrawerToggle}
        >
          <MenuList>
            <MenuItem component={NavLink} to="/" onClick={handleDrawerToggle}>
              Form
            </MenuItem>
            <MenuItem component={NavLink} to="/about" onClick={handleDrawerToggle}>
              About
            </MenuItem>
          </MenuList>
          <Divider />
          <MenuList>
            <MenuItem component={Link} to="/licenses" onClick={handleDrawerToggle}>
              Licenses
            </MenuItem>
          </MenuList>
        </Drawer>
      </ClickAwayListener>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            color="inherit"
            className={classNames(classes.grow, classes.title)}
          >
            {title}
          </Typography>
          {auth && <AppBarProfileMenu links={profileLinks} />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppNavBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  auth: PropTypes.bool,
  profileLinks: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }))
};

export default withStyles(styles)(AppNavBar);
