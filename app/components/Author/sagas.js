import { put, takeLatest } from 'redux-saga/effects';

import Author from '../../models/author';

import { SHOW_NOTIFICATION } from '../Notification/constants';
import { FETCH_AUTHORS, FETCH_AUTHORS_SUCCEEDED, FETCH_AUTHORS_FAILED, CREATE_AUTHORS_SUCCEEDED, CREATE_AUTHORS_FAILED, DELETE_AUTHORS_SUCCEEDED, DELETE_AUTHORS_FAILED, CREATE_AUTHORS, DELETE_AUTHORS, FETCH_AUTHOR_SUCCEEDED, FETCH_AUTHOR_FAILED, FETCH_AUTHOR, UPDATE_AUTHORS_SUCCEEDED, UPDATE_AUTHORS_FAILED, UPDATE_AUTHORS } from './constants';

export function* fetchAuthors() {
  try {
    const data = yield Author.fetchAll();
    yield put({ type: FETCH_AUTHORS_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: FETCH_AUTHORS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch authors' });
  }
}

export function* fetchAuthor({ id }) {
  try {
    const data = yield Author.fetch(id);
    yield put({ type: FETCH_AUTHOR_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: FETCH_AUTHOR_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch an author' });
  }
}

export function* createAuthor({ data }) {
  try {
    yield Author.create(data);
    yield put({ type: CREATE_AUTHORS_SUCCEEDED });
    yield put({ type: FETCH_AUTHORS });
  } catch (error) {
    yield put({ type: CREATE_AUTHORS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to create an author' });
  }
}

export function* updateAuthor({ data }) {
  try {
    yield Author.update(data);
    yield put({ type: UPDATE_AUTHORS_SUCCEEDED });
    yield put({ type: FETCH_AUTHORS });
  } catch (error) {
    yield put({ type: UPDATE_AUTHORS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to update an author' });
  }
}

export function* deleteAuthor({ id }) {
  try {
    yield Author.delete(id);
    yield put({ type: DELETE_AUTHORS_SUCCEEDED });
    yield put({ type: FETCH_AUTHORS });
  } catch (error) {
    yield put({ type: DELETE_AUTHORS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to delete an author' });
  }
}

export function* watchFetchAuthors() {
  yield takeLatest(FETCH_AUTHORS, fetchAuthors);
}

export function* watchFetchAuthor() {
  yield takeLatest(FETCH_AUTHOR, fetchAuthor);
}

export function* watchCreateAuthors() {
  yield takeLatest(CREATE_AUTHORS, createAuthor);
}

export function* watchUpdateAuthors() {
  yield takeLatest(UPDATE_AUTHORS, updateAuthor);
}

export function* watchDeleteAuthors() {
  yield takeLatest(DELETE_AUTHORS, deleteAuthor);
}
