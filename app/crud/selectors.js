import { createSelector } from 'reselect';

const crudSelector = state => state.get('crud');

export const fetchFailed = createSelector(crudSelector, app => app.get('fetchFailed'));
export const createId = createSelector(crudSelector, app => app.get('createId'));
export const createFailed = createSelector(crudSelector, app => app.get('createFailed'));
export const deleteFailed = createSelector(crudSelector, app => app.get('deleteFailed'));
export const updateFailed = createSelector(crudSelector, app => app.get('updateFailed'));
export const loading = createSelector(crudSelector, app => app.get('loading'));
export const data = createSelector(crudSelector, app => app.get('data'));
