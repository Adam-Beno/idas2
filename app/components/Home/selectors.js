import { createSelector } from 'reselect';

const homeSelector = state => state.get('home');

export const books = createSelector(homeSelector, app => app.get('books'));
