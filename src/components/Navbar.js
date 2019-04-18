import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
      openDrawer: false
    };
  }

  handleMenu = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handleClose = key => () => {
    this.setState({ [key]: null });
  };

  handleDrawerOpen = () => {
    this.setState(state => ({ openDrawer: !state.openDrawer }));
  };

  render() {
    const { classes, title } = this.props;
    const { auth, anchorEl, openDrawer } = this.state;
    const openProfileMenu = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <Drawer anchor="left" open={openDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Licenses" />
            </ListItem>
          </List>
        </Drawer>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={openProfileMenu ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={openProfileMenu}
                  onClose={this.handleClose("anchorEl")}
                >
                  <MenuItem onClick={this.handleClose("anchorEl")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleClose("anchorEl")}>
                    My account
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(MenuAppBar);
