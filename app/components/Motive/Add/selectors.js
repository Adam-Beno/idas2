import { createSelector } from 'reselect';

const motiveAddSelector = state => state.get('motiveAdd');

export const values = createSelector(motiveAddSelector, app => app.get('values'));
