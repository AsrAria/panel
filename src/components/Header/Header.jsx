// MARK: library imports
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// MARK: ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import HeaderLinks from "./HeaderLinks.jsx";
import headerStyle from "assets/styles/components/headerStyle.jsx";

// MARK: component

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  return (
    <AppBar id="dashboard-header" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} />
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

// MARK: prop type validation

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

// MARK: export

export default withStyles(headerStyle)(Header);
