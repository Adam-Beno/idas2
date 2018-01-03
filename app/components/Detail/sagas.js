import { put, takeLatest } from 'redux-saga/effects';

import Book from '../../models/book';
import { FETCH_BOOK, FETCH_BOOK_SUCCEEDED, FETCH_BOOK_FAILED } from './constants';
import { SHOW_NOTIFICATION } from '../Notification/constants';

export function* fetchBook({ id }) {
  try {
    const data = yield Book.fetchCardPreviews(id);
    yield put({ type: FETCH_BOOK_SUCCEEDED, data: data[0] });
  } catch (error) {
    yield put({ type: FETCH_BOOK_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch data' });
  }
}

export function* watchFetchBook() {
  yield takeLatest(FETCH_BOOK, fetchBook);
}

