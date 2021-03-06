import { SHOW_NOTIFICATION, DISMISS_NOTIFICATION } from './constants';

export function showNotification(message) {
  return {
    type: SHOW_NOTIFICATION,
    message,
  };
}

export function dismissNotification() {
  return {
    type: DISMISS_NOTIFICATION,
  };
}
