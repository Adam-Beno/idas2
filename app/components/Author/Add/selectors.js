import { createSelector } from 'reselect';

const authorAddSelector = state => state.get('authorAdd');

export const values = createSelector(authorAddSelector, app => app.get('values'));
