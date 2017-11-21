import { fromJS } from 'immutable';
import jwtDecode from 'jwt-decode';

import {
  SWITCH_MENU_STATE,
  SET_USER_TOKEN,
  UNSET_USER_TOKEN,
} from './constants';

const initialState = fromJS({
  menuOpen: false,
  userToken: '',
  user: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU_STATE:
      return state
        .set('menuOpen', action.close ? false : !state.get('menuOpen'));
    case SET_USER_TOKEN:
      try {
        return state
          .set('userToken', action.token)
          .set('user', jwtDecode(action.token));
      } catch (e) {
        return state;
      }
    case UNSET_USER_TOKEN:
      return state
        .set('userToken', '')
        .set('user', {});
    default:
      return state;
  }
}


export default appReducer;
