import React, { useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { ExitToAppSharp, Security } from '@material-ui/icons';

import { useStyles } from '../Styles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContextProvider';

export default function Settings() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={
          <Avatar
            src={user.image}
            className={classes.navAvatar}
          ></Avatar>
        }
      ></Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={ListItem} onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={'/profile'}
            >
              Settings
            </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem component={ListItem} onClick={handleClose}>
          <ListItemIcon>
            <Security />
          </ListItemIcon>
          <ListItemText>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={'/changePassword'}
            >
              Change Password
            </Link>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
