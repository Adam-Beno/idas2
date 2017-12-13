import { createSelector } from 'reselect';

const bookSelector = state => state.get('book');

export const data = createSelector(bookSelector, app => app.get('data'));
