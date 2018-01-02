import { SWITCH_MENU_STATE, SWITCH_WINDOW_STATE } from './constants';

export function switchMenuState(close = false) {
  return {
    type: SWITCH_MENU_STATE,
    close,
  };
}

export function switchWindowState(maximized) {
  return {
    type: SWITCH_WINDOW_STATE,
    maximized,
  };
}
