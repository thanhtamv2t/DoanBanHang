import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/actionType';

const token = localStorage.getItem('token');

const INIT_STATE = {
  isSignedIn: token ? true : false,
  user: null,
  err: null,
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        err: action.payload.error ? action.payload.error : null,
        isSignedIn:!!action.payload.cus_username,
        user: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null
      };
    default:
      return state;
  }
};
