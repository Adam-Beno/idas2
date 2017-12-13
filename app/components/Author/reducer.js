import { fromJS } from 'immutable';

import { SET_DATA } from './constants';

const initialState = fromJS({
  data: {},
});

function authorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return state
        .set('data', action.data);
    default:
      return state;
  }
}

export default authorReducer;
