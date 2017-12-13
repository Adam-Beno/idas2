import { createSelector } from 'reselect';

const printerSelector = state => state.get('printer');

export const data = createSelector(printerSelector, app => app.get('data'));
