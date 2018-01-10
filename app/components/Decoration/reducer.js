import { fromJS } from 'immutable';

import { COMPLETED, SET_NEW_DECORATION, SET_STEP, SET_TILE_ID } from './constants';

const initialState = fromJS({
  step: 0,
  decoration: {},
  tileId: -1,
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
    case SET_TILE_ID:
      return state
        .set('tileId', action.id);
    default:
      return state;
  }
};
