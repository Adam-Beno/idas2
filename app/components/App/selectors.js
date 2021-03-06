import { createSelector } from 'reselect';

const appSelector = state => state.get('app');

export const menuState = createSelector(appSelector, app => app.get('menuOpen'));
export const maximized = createSelector(appSelector, app => app.get('maximized'));
