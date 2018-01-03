import { fromJS } from 'immutable';
import { FETCH_BOOK, FETCH_BOOK_SUCCEEDED, FETCH_BOOK_FAILED } from './constants';

const initialState = fromJS({
  loading: false,
  book: {},
  decorations: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOK:
      return state
        .set('loading', true);
    case FETCH_BOOK_SUCCEEDED:
      return state
        .set('loading', false)
        .set('book', fromJS(action.data));
    case FETCH_BOOK_FAILED:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default reducer;
