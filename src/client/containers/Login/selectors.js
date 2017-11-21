import { createSelector } from 'reselect';

const loginSelector = state => state.get('login');

export const errorMessages = createSelector(loginSelector, app => app.get('errorMessages'));
