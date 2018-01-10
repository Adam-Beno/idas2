import { fromJS } from 'immutable';

import { COMPLETED, SET_NEW_DECORATION, SET_STEP } from './constants';

const initialState = fromJS({
  step: 0,
  decoration: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP:
      return state
        .set('step', action.stepIndex);
    case COMPLETED:
      return initialState;
    case SET_NEW_DECORATION:
      return state
        .set('decoration', fromJS(action.decoration));
    default:
      return state;
  }
};
