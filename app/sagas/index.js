import { all } from 'redux-saga/effects';

// Import custom sagas
import { watchFetchBooks } from './book';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchFetchBooks(),
  ]);
}
