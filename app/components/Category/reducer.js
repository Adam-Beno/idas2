import { fromJS } from 'immutable';

import { SET_DATA } from './constants';

const initialState = fromJS({
  data: {},
});

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return state
        .set('data', action.data);
    default:
      return state;
  }
}

export default categoryReducer;
