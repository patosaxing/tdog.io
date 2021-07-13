import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../eval_view_logo.jpg";

// import MenuIcon from "../";
// import green from "@material-ui/core/colors/green";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  // customColor: {
  //   // or hex code, this is normal CSS background-color
  //   backgroundColor: green[500]
  // },
  // customHeight: {
  //   minHeight: 200
  // },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
        color={"default"}
        // className={'default 16'}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={Logo} alt="Logo" />
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h2" className={classes.title}>
            Eval-view
          </Typography>
          <IconButton color="inherit">Feature</IconButton>
          <IconButton color="inherit">About</IconButton>
          <IconButton color="inherit">Service</IconButton>
          <IconButton color="inherit">Team</IconButton>
          <IconButton color="inherit">Contact</IconButton>
          <IconButton color="inherit">LOGIN / SIGN-UP</IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography>
        This content doesn't appear below the AppBar because we added an
        additional Toolbar component above, this is the recommended approach.{" "}
      </Typography>
      <Typography>
        Change the AppBar example by clicking on one of the numbers above.
      </Typography>
      <Typography>some text here</Typography>
    </React.Fragment>
  );
}
