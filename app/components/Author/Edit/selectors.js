import { createSelector } from 'reselect';

const authorEditSelector = state => state.get('authorEdit');

export const values = createSelector(authorEditSelector, app => app.get('values'));
export const data = createSelector(authorEditSelector, app => app.get('data'));
