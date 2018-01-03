import { all } from 'redux-saga/effects';

// Import custom sagas
import { watchFetchBooks } from '../components/Home/sagas';
import { watchAuthenticate } from '../components/User/sagas';import { watchCrudFetch, watchCrudDelete, watchCrudCreate, watchCrudUpdate } from '../crud/sagas';
import { watchFetchBook } from '../components/Detail/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchFetchBooks(),
    watchAuthenticate(),
    watchCrudFetch(),
    watchCrudDelete(),
    watchCrudCreate(),
    watchCrudUpdate(),
    watchFetchBook(),
  ]);
}
