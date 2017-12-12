import { fromJS } from 'immutable';

import { EDIT_VALUE, CLEAR_STORE } from './constants';

const initialState = fromJS({
  values: {
    name: '',
    surname: '',
    nickname: '',
    age: '',
    genre: '',
  },
});

function authorAddReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_VALUE:
      return state
        .setIn(['values', action.key], (action.kind !== 'number') ? action.value : Number(action.value));
    case CLEAR_STORE:
      return state
        .set('values', initialState);
    default:
      return state;
  }
}

export default authorAddReducer;
