import React, { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';

import {
  Add,
  Assessment,
  DynamicFeed,
  ExpandLess,
  ExpandMore,
  Report,
  Store,
  VerifiedUserTwoTone,
} from '@material-ui/icons';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom';
import { useStyles } from './Styles';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Collapse, ListItemButton } from '@mui/material';

export default function SideBarTabs({ handleDrawerClose }) {
  const history = useHistory();
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState({
    store: true,
    customer: false,
  });

  const handleClick = (newValue) => {
    const { ...clone } = open;
    Object.keys(open).filter((value) => {
      if (newValue === value) {
        clone[value] = !open[value];
      } else {
        clone[value] = false;
      }
    });
    setOpen(clone);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    history.push('/');
    toast.success('Your are successfully logout', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    });
  };
  return (
    <List>
      <Button
        size="small"
        className={classes.navButton}
        onClick={() => handleDrawerClose()}
      >
        <ListItem
          exact
          component={NavLink}
          to="/dashboard"
          className={classes.navlinks}
          activeClassName={classes.activeNavlinks}
        >
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
      </Button>
      {user.role === 'admin' || user.role === 'seller' ? (
        <>
          {user.role === 'admin' && (
            <>
              <Button
                size="small"
                className={classes.navButton}
                onClick={() => handleDrawerClose()}
              >
                <ListItem
                  exact
                  component={NavLink}
                  to="/Customers"
                  className={classes.navlinks}
                  activeClassName={classes.activeNavlinks}
                >
                  <ListItemIcon>
                    {/* <Assessment /> */}
                    <VerifiedUserTwoTone />
                  </ListItemIcon>
                  <ListItemText>Customers</ListItemText>
                </ListItem>
              </Button>

              <ListItemButton onClick={() => handleClick('store')}>
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary="Organic Store" />
                {open.store ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open.store} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <div sx={{ pl: 4 }}>
                    <ListItem
                      exact
                      component={NavLink}
                      to="/stores"
                      className={classes.navlinks}
                      activeClassName={classes.activeNavlinks}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Store />
                        </ListItemIcon>
                        <ListItemText primary="All Stores" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      exact
                      component={NavLink}
                      to="/addStore"
                      className={classes.navlinks}
                      activeClassName={classes.activeNavlinks}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Add />
                        </ListItemIcon>
                        <ListItemText primary="Add new Store" />
                      </ListItemButton>
                    </ListItem>
                  </div>
                </List>
              </Collapse>
            </>
          )}

          <Button
            size="small"
            className={classes.navButton}
            onClick={() => handleDrawerClose()}
          >
            <ListItem
              exact
              component={NavLink}
              to="/requests"
              className={classes.navlinks}
              activeClassName={classes.activeNavlinks}
            >
              <ListItemIcon>
                <DynamicFeed />
              </ListItemIcon>
              <ListItemText>Requests</ListItemText>
            </ListItem>
          </Button>
          <Button
            size="small"
            className={classes.navButton}
            onClick={() => handleDrawerClose()}
          >
            <ListItem
              exact
              component={NavLink}
              to="/reports"
              className={classes.navlinks}
              activeClassName={classes.activeNavlinks}
            >
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItem>
          </Button>
        </>
      ) : null}
      <Button
        size="small"
        className={classes.navButton}
        onClick={logoutHandler}
      >
        <ListItem
          exact
          component={NavLink}
          to={'/login'}
          className={classes.navlinks}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </Button>
    </List>
  );
}
