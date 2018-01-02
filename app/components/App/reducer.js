import { fromJS } from 'immutable';

import { SWITCH_MENU_STATE, SWITCH_WINDOW_STATE } from './constants';

const initialState = fromJS({
  menuOpen: false,
  maximized: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU_STATE:
      return state
        .set('menuOpen', action.close ? false : !state.get('menuOpen'));
    case SWITCH_WINDOW_STATE:
      return state
        .set('maximized', action.maximized);
    default:
      return state;
  }
}

export default appReducer;
