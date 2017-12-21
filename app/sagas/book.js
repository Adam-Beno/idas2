import { put, takeLatest } from 'redux-saga/effects';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import _camelCase from 'lodash/camelCase';

import knex from '../utils/knex';
import { FETCH_BOOKS, FETCH_BOOKS_SUCCEEDED, FETCH_BOOKS_FAILED } from '../components/Home/constants';
import { SHOW_NOTIFICATION } from '../components/Notification/constants';

export function* fetchBooks() {
  try {
    let data = yield knex.raw('SELECT * FROM ( SELECT  b.ID, b.NAME, b.BARCODE, S.PHOTO, a.NAME || \' \' || a.SURNAME AS AUTHOR_NAME, b.PERIOD_OF_ISSUE, b.YEAR_OF_ISSUE, b.DESCRIPTION, ROW_NUMBER() OVER (PARTITION BY b.ID ORDER BY s.BOOK_ID DESC) AS rn FROM BOOK b JOIN SCAN s ON b.ID = s.BOOK_ID JOIN AUTHOR a ON b.AUTHOR_ID = a.ID) WHERE rn = 1');
    data = _map(data, (item) => _mapKeys(item, (val, key) => _camelCase(key)));
    data = _map(data, (item) => _mapValues(item, (val, key) => {
      if (key === 'photo') {
        const buff = new Buffer(val);
        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
      return val;
    }));
    yield put({ type: FETCH_BOOKS_SUCCEEDED, data });
  } catch (error) {
    yield put({ type: FETCH_BOOKS_FAILED, error });
    yield put({ type: SHOW_NOTIFICATION, message: 'Failed to fetch data' });
  }
}

export function* watchFetchBooks() {
  yield takeLatest(FETCH_BOOKS, fetchBooks);
}

