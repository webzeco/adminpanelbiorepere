import decode from 'jwt-decode';
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import client from './client';
import app from '../config/firebase-conf';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider.jsx';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const googleAuthProvider = new GoogleAuthProvider();
const emailAuthProvider = new EmailAuthProvider();
const auth = getAuth(app);

const sendTokenToBackend = async (firebaseToken) => {
  const result = await client.post(`/auth/google/signUser`, {
    firebaseToken,
    firstName: 'abdul',
    lastName: 'rehman',
  });
  if (!result.ok) {
    return toast.error('Some went wrong Please try Again', {
      position: 'top-center',
    });
  }
  localStorage.setItem('jwt', firebaseToken);
  return result.data;
};

export const signWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const token = await result.user.getIdToken();
    const response = await sendTokenToBackend(token);
    return response;
  } catch (err) {
    console.log(err.code);
    console.log(err.message);
    return toast.error(err.message, {
      position: 'top-center',
    });
  }
};

// email auth provider
export const signUpWithEmailAndPass = async (email, password) => {
  const auth = getAuth();
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseToken = await result.user.getIdToken();
    const response = sendTokenToBackend(firebaseToken);
    return response;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode);
    console.log(errorMessage);
    console.log(error);
  }
};
export const loginWithEmailAndPass = async (email, password) => {
  const auth = getAuth();
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log({ result });
    const firebaseToken = await result.user.getIdToken();
    console.log({ firebaseToken });
    const response = sendTokenToBackend(firebaseToken);
    return response;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log(error);
  }
};

const getEmailAuthToken = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(result.user);
  } catch (err) {
    alert(err.message);
    console.log(err.code);
    console.log(err.message);
  }
};
////////////////////////////////////////////

export const login = (user) =>
  client.post('/auth/login', {
    email: user.email,
    password: user.password,
    role: user.role,
  });

export const forgotPassword = (email) =>
  client.post('/auth/forgotPassword', {
    email,
  });

export const resetPassword = (data, token) => {
  return client.patch(`/auth/resetPassword/${token}`, {
    password: data.password,
    passwordConfirm: data.confirmPassword,
  });
};

export const updatePassword = (data) => {
  return client.patch('/auth/updatePassword', {
    passwordCurrent: data.currentPassword,
    password: data.newPassword,
    passwordConfirm: data.confirmNewPassword,
  });
};

export const getUser = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const user = decode(token);
    return user;
  } else {
    return null;
  }
};

export const jwtClear = () => {
  localStorage.removeItem('jwt');
  window.location = '/login';
};
