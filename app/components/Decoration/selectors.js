import { createSelector } from 'reselect';

const selector = state => state.get('decoration');

export const step = createSelector(selector, app => app.get('step'));
export const decoration = createSelector(selector, app => app.get('decoration'));
export const tileId = createSelector(selector, app => app.get('tileId'));
