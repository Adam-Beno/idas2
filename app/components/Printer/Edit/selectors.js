import { createSelector } from 'reselect';

const printerEditSelector = state => state.get('printerEdit');

export const values = createSelector(printerEditSelector, app => app.get('values'));
export const data = createSelector(printerEditSelector, app => app.get('data'));
