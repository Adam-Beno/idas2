import { createSelector } from 'reselect';

const notificationSelector = state => state.get('notification');

export const message = createSelector(notificationSelector, app => app.get('message'));
export const displayNotification = createSelector(notificationSelector, app => app.get('displayNotification'));
