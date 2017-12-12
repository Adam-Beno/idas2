import { fromJS } from 'immutable';

import { SWITCH_EXPAND_STATE, SWITCH_MENU_STATE } from './constants';

const initialState = fromJS({
  expanded: false,
  menuOpen: false,
  anchorEl: undefined,
});

function bookCardReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_EXPAND_STATE:
      return state
        .set('expanded', action.close ? false : !state.get('expanded'));
    case SWITCH_MENU_STATE:
      return state
        .set('menuOpen', action.close ? false : !state.get('menuOpen')).set('anchorEl', action.target);
    default:
      return state;
  }
}

export default bookCardReducer;
