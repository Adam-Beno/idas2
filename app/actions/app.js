import { SWITCH_MENU_STATE, SWITCH_WINDOW_STATE } from '../constants/app';

export function switchMenuState(close = false) {
  return {
    type: SWITCH_MENU_STATE,
    close,
  };
}

export function switchWindowState(maximized = false) {
  return {
    type: SWITCH_WINDOW_STATE,
    maximized,
  };
}
