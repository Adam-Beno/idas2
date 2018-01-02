import { createSelector } from 'reselect';

const appSelector = state => state.get('author');

export const author = createSelector(appSelector, app => app.get('author'));
export const authors = createSelector(appSelector, app => app.get('authors'));
export const fetchFailed = createSelector(appSelector, app => app.get('fetchFailed'));
export const loading = createSelector(appSelector, app => app.get('loading'));
