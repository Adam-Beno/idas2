import { fromJS } from 'immutable';

const initialState = fromJS({
});

function authorReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authorReducer;
