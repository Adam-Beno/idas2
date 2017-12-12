import { SWITCH_MENU_STATE } from './constants';

export function switchMenuState(close = false) {
  return {
    type: SWITCH_MENU_STATE,
    close,
  };
}
