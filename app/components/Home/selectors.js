import { createSelector } from 'reselect';

const homeSelector = state => state.get('home');

export const books = createSelector(homeSelector, app => app.get('books'));
export const fetchFailed = createSelector(homeSelector, app => app.get('fetchFailed'));
