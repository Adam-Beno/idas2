import { SWITCH_MENU_STATE, SET_USER_TOKEN, UNSET_USER_TOKEN } from './constants';

export function switchMenuState(close = false) {
  return {
    type: SWITCH_MENU_STATE,
    close,
  };
}

export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    token,
  };
}

export function unsetUserToken() {
  return {
    type: UNSET_USER_TOKEN,
  };
}
