import { FETCH_BOOKS, FETCH_BOOKS_FAILED, FETCH_BOOKS_SUCCEEDED } from './constants';

export function fetchBooks() {
  return {
    type: FETCH_BOOKS,
  };
}

export function fetchBooksSucceded(data) {
  return {
    type: FETCH_BOOKS_SUCCEEDED,
    data
  };
}

export function fetchBooksFailed(error) {
  return {
    type: FETCH_BOOKS_FAILED,
    error
  };
}
