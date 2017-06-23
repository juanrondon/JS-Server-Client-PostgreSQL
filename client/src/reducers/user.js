import {
  USER_AUTH,
  USER_DEAUTH,
  USER_ERROR,
  USER_REGISTER
} from '../actions/types.js';

const INITIAL_STATE = {
  authenticated: false,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH: {
      return {
        ...state,
        authenticated: true,
        error: ''
      }
    }
    case USER_DEAUTH: {
      return {
        ...state,
        authenticated: false,
        error: ''
      }
    }
    case USER_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default:
      return state;
  }
}