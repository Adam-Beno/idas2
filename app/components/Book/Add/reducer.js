import { fromJS } from 'immutable';

import { NEXT_STEP, COMPLETED, SET_DATA, SET_INFO, DROP_FILES, SET_NEW_BOOK_ID } from './constants';

const initialState = fromJS({
  step: 0,
  data: {},
  info: {},
  newBookId: 0,
  files: [],
});

function bookAddReducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_STEP:
      return state
        .set('step', (state.get('step') + 1));
    case COMPLETED:
      return initialState;
    case SET_DATA:
      return state
        .set('data', action.data);
    case DROP_FILES:
      return state
        .set('files', action.files);
    case SET_INFO:
      return state
        .setIn(['info', action.key], action.value);
    default:
      return state;
    case SET_NEW_BOOK_ID:
      return state
        .set('newBookId', action.id);
  }
}

export default bookAddReducer;
