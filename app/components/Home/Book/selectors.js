import { createSelector } from 'reselect';

const bookSelector = state => state.get('bookCard');

export const expanded = createSelector(bookSelector, app => app.get('expanded'));
export const menuOpen = createSelector(bookSelector, app => app.get('menuOpen'));
export const anchorEl = createSelector(bookSelector, app => app.get('anchorEl'));
