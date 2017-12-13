import { createSelector } from 'reselect';

const categoryAddSelector = state => state.get('categoryAdd');

export const values = createSelector(categoryAddSelector, app => app.get('values'));
