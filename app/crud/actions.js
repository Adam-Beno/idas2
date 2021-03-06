import { FETCH, FETCH_SUCCEEDED, FETCH_FAILED, CREATE, CREATE_SUCCEEDED, CREATE_FAILED, UPDATE, UPDATE_SUCCEEDED, UPDATE_FAILED, DELETE, DELETE_SUCCEEDED, DELETE_FAILED, CLEAR } from './constants';

export const fetch = (modelClass, params = {}) => ({
  type: FETCH,
  modelClass,
  params,
});

export const fetchSucceeded = (modelClass, data) => ({
  type: FETCH_SUCCEEDED,
  modelClass,
  data,
});

export const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  error,
});

export const create = (modelClass, data) => ({
  type: CREATE,
  modelClass,
  data,
});

export const createSucceeded = (id) => ({
  type: CREATE_SUCCEEDED,
  id,
});

export const createFailed = (error) => ({
  type: CREATE_FAILED,
  error,
});

export const update = (modelClass, data, params = {}) => ({
  type: UPDATE,
  modelClass,
  data,
  params,
});

export const updateSucceeded = () => ({
  type: UPDATE_SUCCEEDED,
});

export const updateFailed = (error) => ({
  type: UPDATE_FAILED,
  error,
});

export const del = (modelClass, id) => ({
  type: DELETE,
  modelClass,
  id,
});

export const deleteSucceeded = () => ({
  type: DELETE_SUCCEEDED,
});

export const deleteFailed = (error) => ({
  type: DELETE_FAILED,
  error,
});

export const clear = () => ({
  type: CLEAR,
});
