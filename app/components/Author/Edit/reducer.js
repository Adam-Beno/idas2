import { fromJS } from 'immutable';

import { EDIT_VALUE, CLEAR_STORE, SET_DATA } from './constants';

const initialState = fromJS({
  values: {},
  data: {},
});

function authorAddReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_VALUE:
      return state
        .setIn(['values', action.key], (action.kind !== 'number') ? action.value : Number(action.value));
    case CLEAR_STORE:
      return initialState;
    case SET_DATA:
      return state
        .set('data', action.data);
    default:
      return state;
  }
}

export default authorAddReducer;
