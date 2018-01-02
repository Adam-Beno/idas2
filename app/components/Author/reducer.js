import { fromJS } from 'immutable';

import { FETCH_AUTHORS_SUCCEEDED, FETCH_AUTHORS_FAILED, DELETE_AUTHORS_FAILED, CREATE_AUTHORS_FAILED, FETCH_AUTHOR_FAILED, FETCH_AUTHOR_SUCCEEDED, UPDATE_AUTHORS_FAILED, FETCH_AUTHOR, FETCH_AUTHORS } from './constants';

const initialState = fromJS({
  author: {},
  authors: [],
  fetchFailed: false,
  deleteFailed: false,
  createFailed: false,
  updateFailed: false,
  loading: false,
});

function authorReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHOR:
    case FETCH_AUTHORS:
      return state
        .set('loading', true);
    case FETCH_AUTHORS_SUCCEEDED:
      return state
        .set('authors', fromJS(action.data))
        .set('fetchFailed', false)
        .set('loading', false);
    case FETCH_AUTHOR_SUCCEEDED:
      return state
        .set('author', fromJS(action.data))
        .set('fetchFailed', false)
        .set('loading', false);
    case FETCH_AUTHORS_FAILED:
      return state
        .set('fetchFailed', true);
    case FETCH_AUTHOR_FAILED:
      return state
        .set('fetchFailed', true);
    case DELETE_AUTHORS_FAILED:
      return state
        .set('deleteFailed', true);
    case CREATE_AUTHORS_FAILED:
      return state
        .set('createFailed', true);
    case UPDATE_AUTHORS_FAILED:
      return state
        .set('updateFailed', true);
    default:
      return state;
  }
}

export default authorReducer;
