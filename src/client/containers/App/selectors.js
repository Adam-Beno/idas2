import { createSelector } from 'reselect';

const appSelector = state => state.get('app');

export const menuState = createSelector(appSelector, app => app.get('menuOpen'));
export const user = createSelector(appSelector, app => app.get('user'));
export const userToken = createSelector(appSelector, app => app.get('userToken'));

