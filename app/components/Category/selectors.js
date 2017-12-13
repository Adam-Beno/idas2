import { createSelector } from 'reselect';

const categorySelector = state => state.get('category');

export const data = createSelector(categorySelector, app => app.get('data'));
