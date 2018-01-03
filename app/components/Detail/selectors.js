import { createSelector } from 'reselect';

const selector = state => state.get('detail');

export const book = createSelector(selector, app => app.get('book'));
export const loading = createSelector(selector, app => app.get('loading'));
