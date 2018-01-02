import { fromJS } from 'immutable';
import { FETCH_FAILED, FETCH_SUCCEEDED, FETCH, CREATE_SUCCEEDED, CREATE_FAILED, UPDATE_SUCCEEDED, UPDATE_FAILED, DELETE_SUCCEEDED, DELETE_FAILED, CREATE, DELETE, UPDATE } from './constants';

const initialState = fromJS({
  data: {},
  fetchFailed: false,
  deleteFailed: false,
  createFailed: false,
  createId: -1,
  updateFailed: false,
  loading: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return state
        .set('loading', true);
    case FETCH_SUCCEEDED:
      return state
        .setIn(['data', action.modelClass.getTable()], fromJS(action.data))
        .set('fetchFailed', false)
        .set('loading', false);
    case FETCH_FAILED:
      return state
        .set('fetchFailed', true)
        .set('loading', false);
    case CREATE:
      return state
        .set('createId', -1)
        .set('loading', true);
    case CREATE_SUCCEEDED:
      return state
        .set('createFailed', false)
        .set('createId', action.id)
        .set('loading', false);
    case CREATE_FAILED:
      return state
        .set('createFailed', true)
        .set('loading', false);
    case UPDATE:
      return state
        .set('loading', true);
    case UPDATE_SUCCEEDED:
      return state
        .set('updateFailed', false)
        .set('loading', false);
    case UPDATE_FAILED:
      return state
        .set('updateFailed', true)
        .set('loading', false);
    case DELETE:
      return state
        .set('loading', true);
    case DELETE_SUCCEEDED:
      return state
        .set('deleteFailed', false)
        .set('loading', false);
    case DELETE_FAILED:
      return state
        .set('deleteFailed', true)
        .set('loading', false);
    default:
      return state;
  }
};

export default reducer;
