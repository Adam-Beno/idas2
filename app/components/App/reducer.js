import { fromJS } from 'immutable';

import { SWITCH_MENU_STATE } from './constants';

const initialState = fromJS({
  menuOpen: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU_STATE:
      return state
        .set('menuOpen', action.close ? false : !state.get('menuOpen'));
    default:
      return state;
  }
}

export default appReducer;
