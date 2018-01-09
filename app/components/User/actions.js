import {
  CHANGE_TAB,
  AUTHENTICATE,
  AUTHENTICATE_FAILED,
  AUTHENTICATE_SUCCEEDED,
  LOGOUT,
 } from './constants';

export const changeTab = tab => ({
  type: CHANGE_TAB,
  tab,
});

export const logout = () => ({
  type: LOGOUT
});

export const authenticate = (username, password) => ({
  type: AUTHENTICATE,
  username,
  password,
});

export const authenticateFailed = (error) => ({
  type: AUTHENTICATE_FAILED,
  error,
});

export const authenticateSucceeded = (data) => ({
  type: AUTHENTICATE_SUCCEEDED,
  data,
});
