import { put, takeLatest } from 'redux-saga/effects';

import Book from '../../models/book';
import { FETCH_BOOKS, FETCH_BOOKS_SUCCEEDED, FETCH_BOOKS_FAILED } from './constants';
import { SHOW_NOTIFICATION } from '../Notification/constants';

export function* fetchBooks() {
  try {
    const data = yield Book.fetchAll();
    yield put({ type: FETCH_BOOKS_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch data' });
  }
}

export function* watchFetchBooks() {
  yield takeLatest(FETCH_BOOKS, fetchBooks);
}

