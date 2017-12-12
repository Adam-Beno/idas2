import { SWITCH_EXPAND_STATE, SWITCH_MENU_STATE } from './constants';

export function switchExpandState(close = false) {
  return {
    type: SWITCH_EXPAND_STATE,
    close,
  };
}

export function switchMenuState(target, close = false) {
  return {
    type: SWITCH_MENU_STATE,
    target,
    close,
  };
}
