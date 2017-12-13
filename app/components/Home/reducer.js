import { fromJS } from 'immutable';

import { SET_BOOKS } from './constants';

const initialState = fromJS({
  books: [],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return state
        .set('books', action.books);
    default:
      return state;
  }
}

export default homeReducer;
