import { Box } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import BlogComponent from './BlogComponent';
import Dashboard from './Dashboard';
import Forgot from './Forgot';
import Link from './Link';
import Login from './Login';
import FooterComponent from './FooterComponent';
import Header from './Header/Header';
import { useStyles } from './Header/Styles';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Profile';
import Staff from './Staff';
import UpdatePassword from './UpdatePassword';
import Requests from './Requests';
import Reports from './Reports';
import UserDetail from './UserDetailScreen';
import Intro from './Intro';
import { AuthContext } from '../contexts/AuthContextProvider';
import Customers from './Customers';
import StoreScreen from './StoreScreen';
import AddStoreScreen from './AddStoreScreen';
import Payments from './Payments';
import StoreDetail from './StoreDetail';
import LoginScreen from './LoginScreen';
import SignUpScreen from './signupScreen';

export default function Main() {
  // const [user, setUser] = useState();
  const { user, setUser } = useContext(AuthContext);
  const classes = useStyles();
  // useEffect(() => {
  //   setUser(getUser);
  // }, []);

  // const loginHandler = async (user) => {
  //   const res = await login(user);
  //   if (!res.ok)
  //     return toast.error('Incorrect username or password', {
  //       position: toast.POSITION.TOP_CENTER,
  //       theme: 'colored',
  //     });
  //   await setUser(res.data.user);
  //   localStorage.setItem('jwt', res.data.token);
  //   toast.success('logged in successfully !!!', {
  //     position: toast.POSITION.TOP_CENTER,
  //     theme: 'colored',
  //   });
  //   window.location = '/dashboard';
  // };

  return (
    <div>
      <ToastContainer style={{ width: '322px' }} />
      <BrowserRouter>
        {user && (
          <>
            <Box className={classes.wrapper}>
              <Switch>
                <Route
                  exact
                  path="/dashboard"
                  render={(props) => <Dashboard {...props} />}
                />
                <Route
                  exact
                  path="/profile"
                  render={(props) => <Profile {...props} />}
                />
                <Route
                  exact
                  path="/storedetail"
                  render={(props) => <StoreDetail {...props} />}
                />
                <Route
                  exact
                  path="/blog"
                  render={(props) => <BlogComponent {...props} />}
                />
                <Route
                  exact
                  path="/payment"
                  render={(props) => <Payments {...props} />}
                />

                <Route
                  exact
                  path="/requests"
                  render={(props) => <Requests {...props} />}
                />
                <Route
                  exact
                  path="/team"
                  render={(props) => <Staff {...props} />}
                />
                <Route
                  exact
                  path="/reports"
                  render={(props) => <Reports {...props} />}
                />
                <Route
                  exact
                  path="/customers"
                  render={(props) => <Customers {...props} />}
                />
                <Route
                  exact
                  path="/stores"
                  render={(props) => <StoreScreen {...props} />}
                />
                <Route
                  exact
                  path="/addStore"
                  render={(props) => <AddStoreScreen {...props} />}
                />
                <Route
                  exact
                  path="/changePassword"
                  render={(props) => <UpdatePassword {...props} />}
                />
                <Route
                  exact
                  path="/userDetail/:id"
                  render={(props) => <UserDetail {...props} />}
                />
              </Switch>
              <Header />
              <FooterComponent />
            </Box>
          </>
        )}
        {!user && (
          <Switch>
            <Route
              exact
              path="/forgot"
              render={(props) => <Forgot {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginScreen {...props} />}
            />
            <Route
              exact
              path="/signUp"
              render={(props) => <SignUpScreen {...props} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <Intro {...props} />}
            />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}
