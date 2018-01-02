import { createSelector } from 'reselect';

const selector = state => state.get('catalog');

export const objectType = createSelector(selector, app => app.get('objectType'));

