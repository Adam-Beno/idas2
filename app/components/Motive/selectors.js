import { createSelector } from 'reselect';

const motiveSelector = state => state.get('motive');

export const data = createSelector(motiveSelector, app => app.get('data'));
