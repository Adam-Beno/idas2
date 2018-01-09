import { createSelector } from 'reselect';

const selector = state => state.get('bookEdit');

export const tab = createSelector(selector, app => app.get('tab'));
