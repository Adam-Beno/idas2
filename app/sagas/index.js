import { all } from 'redux-saga/effects';

// Import custom sagas
import { watchFetchBooks } from '../components/Home/sagas';
import { watchAuthenticate } from '../components/User/sagas';
import { watchFetchAuthors, watchCreateAuthors, watchDeleteAuthors, watchFetchAuthor, watchUpdateAuthors } from '../components/Author/sagas';
import { watchCrudFetch, watchCrudDelete, watchCrudCreate, watchCrudUpdate } from '../crud/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchFetchBooks(),
    watchAuthenticate(),
    watchFetchAuthors(),
    watchFetchAuthor(),
    watchCreateAuthors(),
    watchUpdateAuthors(),
    watchDeleteAuthors(),
    watchCrudFetch(),
    watchCrudDelete(),
    watchCrudCreate(),
    watchCrudUpdate(),
  ]);
}
