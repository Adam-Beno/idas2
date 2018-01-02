import { fromJS } from 'immutable';

import { NEXT_STEP, COMPLETED, SET_DATA, SET_INFO, DROP_FILES, SET_NEW_BOOK_ID, SET_FORM_DATA, SET_FILES_DATA } from './constants';

const initialState = fromJS({
  step: 0,
  data: {},
  info: {},
  newBookId: 0,
  files: [],
  newBookData: {},
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
        .set('files', fromJS(action.files));
    case SET_INFO:
      return state
        .setIn(['info', action.key], action.value);
    case SET_FORM_DATA:
      return state
        .setIn(['newBookData', 'info'], fromJS(action.data));
    case SET_FILES_DATA:
      return state
        .setIn(['newBookData', 'files'], fromJS(action.data));
    default:
      return state;
    case SET_NEW_BOOK_ID:
      return state
        .set('newBookId', action.id);
  }
}

export default bookAddReducer;
