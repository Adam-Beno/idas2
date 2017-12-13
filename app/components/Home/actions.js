import { SET_BOOKS } from './constants';

export function getBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}
