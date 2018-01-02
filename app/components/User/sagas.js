import { put, takeLatest } from 'redux-saga/effects';

import User from '../../models/user';
import { AUTHENTICATE, AUTHENTICATE_FAILED, AUTHENTICATE_SUCCEEDED } from './constants';
import { SHOW_NOTIFICATION } from '../Notification/constants';

export function* fetchAuthentication({ username, password }) {
  try {
    const data = yield User.authenticate(username, password);
    yield put({ type: AUTHENTICATE_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: AUTHENTICATE_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to authenticate' });
  }
}

export function* watchAuthenticate() {
  yield takeLatest(AUTHENTICATE, fetchAuthentication);
}

