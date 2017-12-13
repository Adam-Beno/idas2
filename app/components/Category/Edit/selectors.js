import { createSelector } from 'reselect';

const categoryEditSelector = state => state.get('categoryEdit');

export const values = createSelector(categoryEditSelector, app => app.get('values'));
export const data = createSelector(categoryEditSelector, app => app.get('data'));
