import { createSelector } from 'reselect';

const appSelector = state => state.get('author');

export const data = createSelector(appSelector, app => app.get('data'));
