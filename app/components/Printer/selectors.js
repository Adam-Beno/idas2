import { createSelector } from 'reselect';

const printerSelector = state => state.get('printer');

export const printers = createSelector(printerSelector, app => app.get('printers'));
