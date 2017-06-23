import axios from 'axios';
import {
  USER_AUTH,
  USER_DEAUTH,
  USER_ERROR
} from './types';
import { ROOT_URL } from '../constants/api';
import { BrowserRouter as Router } from 'react-router-dom';

export function loginUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/login`, { username, password })
      .then(response => {
        dispatch({ type: USER_AUTH });
        localStorage.setItem('token', response.data.token);
        /* TODO: put a redirect here, this will be where the user gets sent
         * after successfully signing in */
      })
      .catch(() => {
        dispatch(authError('Your log in information was incorrect.'));
      });
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  return { type: USER_DEAUTH };
}

export function registerUser({ username, password, email }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/register`, { username, password, email })
      .then(response => {
        dispatch({ type: USER_AUTH });
        localStorage.setItem('token', response.data.token);
        /* TODO: put a redirect here, this will be where the user gets sent
         * after successfully registering */
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: USER_ERROR,
    payload: error
  }
}