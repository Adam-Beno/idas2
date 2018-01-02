import { fromJS } from 'immutable';
import { SET_OBJECT_TYPE } from './constants';

const initialState = fromJS({
  objectType: 'TABLE',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OBJECT_TYPE:
      return state
        .set('objectType', action.objectType);
    default:
      return state;
  }
}

export default reducer;
