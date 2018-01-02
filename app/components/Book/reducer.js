import { fromJS } from 'immutable';

const initialState = fromJS({
  data: {},
});

function bookReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default bookReducer;
