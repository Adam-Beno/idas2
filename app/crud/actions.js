import { FETCH, FETCH_SUCCEEDED, FETCH_FAILED, CREATE, CREATE_SUCCEEDED, CREATE_FAILED, UPDATE, UPDATE_SUCCEEDED, UPDATE_FAILED, DELETE, DELETE_SUCCEEDED, DELETE_FAILED } from './constants';

export const fetch = (modelClass, succeedAction, params = {}) => ({
  type: FETCH,
  modelClass,
  succeedAction,
  params,
});

export const fetchSucceeded = () => ({
  type: FETCH_SUCCEEDED,
});

export const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  error,
});

export const create = (modelClass, succeedAction, data) => ({
  type: CREATE,
  modelClass,
  succeedAction,
  data,
});

export const createSucceeded = () => ({
  type: CREATE_SUCCEEDED,
});

export const createFailed = (error) => ({
  type: CREATE_FAILED,
  error,
});

export const update = (modelClass, succeedAction, data) => ({
  type: UPDATE,
  modelClass,
  succeedAction,
  data,
});

export const updateSucceeded = () => ({
  type: UPDATE_SUCCEEDED,
});

export const updateFailed = (error) => ({
  type: UPDATE_FAILED,
  error,
});

export const del = (modelClass, succeedAction, id) => ({
  type: DELETE,
  modelClass,
  succeedAction,
  id,
});

export const deleteSucceeded = () => ({
  type: DELETE_SUCCEEDED,
});

export const deleteFailed = (error) => ({
  type: DELETE_FAILED,
  error,
});
