import { fromJS } from 'immutable';

import { CHECK_AGE_REQUIREMENT, SET_ERROR_MESSAGES, UNSERT_ERROR_MESSAGES } from './constants';

const initialState = fromJS({
  ageRequirementMet: false,
  errorMessages: undefined,
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_AGE_REQUIREMENT:
      return state
        .set('ageRequirementMet', action.checked ? false : !state.get('ageRequirementMet'));
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

export default registerReducer;
