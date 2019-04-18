import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  ClickAwayListener,
  IconButton,
  Divider
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

class AppBarProfileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { links } = this.props;
    const open = Boolean(anchorEl);

    return (
      <ClickAwayListener onClickAway={this.handleClose}>
        <Fragment>
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
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
            open={open}
          >
            {links.map(({ route, text }) => (
              <MenuItem component={Link} to={route} key={route} onClick={this.handleClose}>
                {text}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem component={Link} to="/account/logout" onClick={this.handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </Fragment>
      </ClickAwayListener>
    );
  }
}

export default AppBarProfileMenu;
