import { FETCH_AUTHORS, FETCH_AUTHORS_SUCCEEDED, FETCH_AUTHORS_FAILED, DELETE_AUTHORS, DELETE_AUTHORS_SUCCEEDED, DELETE_AUTHORS_FAILED, CREATE_AUTHORS, CREATE_AUTHORS_SUCCEEDED, CREATE_AUTHORS_FAILED, FETCH_AUTHOR, FETCH_AUTHOR_SUCCEEDED, FETCH_AUTHOR_FAILED, UPDATE_AUTHORS, UPDATE_AUTHORS_SUCCEEDED, UPDATE_AUTHORS_FAILED, SET_LOADING } from './constants';

export const fetchAuthors = () => ({
  type: FETCH_AUTHORS,
});

export const fetchAuthorsSucceeded = (data) => ({
  type: FETCH_AUTHORS_SUCCEEDED,
  data,
});

export const fetchAuthorsFailed = (error) => ({
  type: FETCH_AUTHORS_FAILED,
  error,
});

export const fetchAuthor = (id) => ({
  type: FETCH_AUTHOR,
  id
});

export const fetchAuthorSucceeded = (data) => ({
  type: FETCH_AUTHOR_SUCCEEDED,
  data,
});

export const fetchAuthorFailed = (error) => ({
  type: FETCH_AUTHOR_FAILED,
  error,
});

export const deleteAuthor = (id) => ({
  type: DELETE_AUTHORS,
  id,
});

export const deleteAuthorsSucceeded = () => ({
  type: DELETE_AUTHORS_SUCCEEDED,
});

export const deleteAuthorsFailed = (error) => ({
  type: DELETE_AUTHORS_FAILED,
  error,
});

export const createAuthor = (data) => ({
  type: CREATE_AUTHORS,
  data,
});

export const createAuthorsSucceeded = () => ({
  type: CREATE_AUTHORS_SUCCEEDED,
});

export const createAuthorsFailed = (error) => ({
  type: CREATE_AUTHORS_FAILED,
  error,
});

export const updateAuthor = (data) => ({
  type: UPDATE_AUTHORS,
  data,
});

export const updateAuthorsSucceeded = () => ({
  type: UPDATE_AUTHORS_SUCCEEDED,
});

export const updateAuthorsFailed = (error) => ({
  type: UPDATE_AUTHORS_FAILED,
  error,
});
