import { createSelector } from 'reselect';

const userSelector = state => state.get('user');

export const tab = createSelector(userSelector, app => app.get('tab'));
export const authenticated = createSelector(userSelector, app => app.get('authenticated'));
