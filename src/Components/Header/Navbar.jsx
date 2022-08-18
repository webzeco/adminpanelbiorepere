import React from 'react';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { useStyles } from './Styles';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from './Navtabs/Setting.jsx';

export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" style={{ background: '#35A777' }}>
      <Toolbar className={classes.toolbar}>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="logo"
          height={'50px'}
        />
        <Hidden smDown>
          <Settings />
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
