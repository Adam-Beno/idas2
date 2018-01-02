import { fromJS } from 'immutable';

const initialState = fromJS({
});

function motiveReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default motiveReducer;
