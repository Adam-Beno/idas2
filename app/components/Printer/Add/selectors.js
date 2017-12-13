import { createSelector } from 'reselect';

const printerAddSelector = state => state.get('printerAdd');

export const values = createSelector(printerAddSelector, app => app.get('values'));
