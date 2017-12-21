import { SET_BOOKS, FETCH_BOOKS, FETCH_BOOKS_FAILED, FETCH_BOOKS_SUCCEEDED } from './constants';

export function getBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}

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
