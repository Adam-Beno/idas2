import { createSelector } from 'reselect';

const motiveEditSelector = state => state.get('motiveEdit');

export const values = createSelector(motiveEditSelector, app => app.get('values'));
export const data = createSelector(motiveEditSelector, app => app.get('data'));
