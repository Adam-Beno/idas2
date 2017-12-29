import { fromJS } from 'immutable';

import {
  SHOW_NOTIFICATION,
  DISMISS_NOTIFICATION,
} from '../constants/notification';

const initialState = fromJS({
  message: '',
  displayNotification: false,
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state
        .set('message', action.message)
        .set('displayNotification', true);
    case DISMISS_NOTIFICATION:
      return state
        .set('displayNotification', false);
    default:
      return state;
  }
}


export default notificationReducer;

