import { fromJS } from 'immutable';

import { SET_BOOKS, FETCH_BOOKS_SUCCEEDED, FETCH_BOOKS_FAILED } from './constants';

const initialState = fromJS({
  books: [],
  fetchFailed: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return state
        .set('books', action.books);
    case FETCH_BOOKS_SUCCEEDED:
      return state
        .set('books', fromJS(action.data))
        .set('fetchFailed', false);
    case FETCH_BOOKS_FAILED:
      return state
        .set('fetchFailed', true);
    default:
      return state;
  }
}

export default homeReducer;
