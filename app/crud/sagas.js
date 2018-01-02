import { put, takeLatest } from 'redux-saga/effects';

import { SHOW_NOTIFICATION } from '../components/Notification/constants';
import { FETCH_SUCCEEDED, FETCH_FAILED, FETCH, CREATE_SUCCEEDED, CREATE_FAILED, UPDATE_SUCCEEDED, UPDATE_FAILED, DELETE_FAILED, DELETE_SUCCEEDED, CREATE, UPDATE, DELETE } from './constants';

export function* fetch({ modelClass, succeedAction, params }) {
  try {
    const data = yield modelClass.fetch(params);
    yield put({ type: succeedAction, data });
    yield put({ type: FETCH_SUCCEEDED });
  } catch (error) {
    yield put({ type: FETCH_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch' });
  }
}

export function* create({ modelClass, succeedAction, data }) {
  try {
    yield modelClass.create(data);
    yield put({ type: succeedAction });
    yield put({ type: CREATE_SUCCEEDED });
  } catch (error) {
    yield put({ type: CREATE_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to create' });
  }
}

export function* update({ modelClass, succeedAction, data }) {
  try {
    yield modelClass.update(data);
    yield put({ type: succeedAction });
    yield put({ type: UPDATE_SUCCEEDED });
  } catch (error) {
    yield put({ type: UPDATE_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to update' });
  }
}

export function* del({ modelClass, succeedAction, id }) {
  try {
    yield modelClass.delete(id);
    yield put({ type: succeedAction });
    yield put({ type: DELETE_SUCCEEDED });
  } catch (error) {
    yield put({ type: DELETE_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to delete' });
  }
}

export function* watchCrudFetch() {
  yield takeLatest(FETCH, fetch);
}

export function* watchCrudCreate() {
  yield takeLatest(CREATE, create);
}

export function* watchCrudUpdate() {
  yield takeLatest(UPDATE, update);
}

export function* watchCrudDelete() {
  yield takeLatest(DELETE, del);
}
