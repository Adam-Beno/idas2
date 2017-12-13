import { createSelector } from 'reselect';

const bookAddSelector = state => state.get('bookAdd');

export const step = createSelector(bookAddSelector, app => app.get('step'));
export const data = createSelector(bookAddSelector, app => app.get('data'));
export const info = createSelector(bookAddSelector, app => app.get('info'));
export const newBookId = createSelector(bookAddSelector, app => app.get('newBookId'));
export const files = createSelector(bookAddSelector, app => app.get('files'));
