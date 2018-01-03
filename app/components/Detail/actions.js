import { FETCH_BOOK, FETCH_DECORATIONS, FETCH_BOOK_SUCCEEDED, FETCH_BOOK_FAILED } from './constants';

export const fetchBook = (id) => ({
  type: FETCH_BOOK,
  id,
});

export const fetchBookSucceeded = (data) => ({
  type: FETCH_BOOK_SUCCEEDED,
  data,
});

export const fetchBookFailed = (error) => ({
  type: FETCH_BOOK_FAILED,
  error,
});

export const fetchDecorations = (bookId) => ({
  type: FETCH_DECORATIONS,
  bookId,
});
