import { fromJS } from 'immutable';

import {
  SET_ERROR_MESSAGES,
  UNSERT_ERROR_MESSAGES,
} from './constants';

const initialState = fromJS({
  errorMessages: undefined,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_MESSAGES:
      return state
        .set('errorMessages', action.errors);
    case UNSERT_ERROR_MESSAGES:
      return state
        .set('errorMessages', undefined);
    default:
      return state;
  }
}


export default loginReducer;
