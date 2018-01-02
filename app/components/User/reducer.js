import { fromJS } from 'immutable';

import {
  TAB_CHANGE,
  AUTHENTICATE_FAILED,
  AUTHENTICATE_SUCCEEDED,
  LOGOUT,
 } from './constants';

const initialState = fromJS({
  authenticationFailed: false,
  tab: 0,
  authenticated: {},
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCEEDED:
      return state
        .set('authenticated', action.data)
        .set('authenticationFailed', false);
    case AUTHENTICATE_FAILED:
      return state
        .set('authenticationFailed', true);
    case LOGOUT:
      return state
          .set('authenticated', fromJS({}));
    case TAB_CHANGE:
      return state
        .set('tab', action.tab);
    default:
      return state;
  }
}

export default userReducer;
