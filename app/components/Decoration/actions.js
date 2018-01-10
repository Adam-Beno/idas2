import { SET_STEP, COMPLETED, SET_NEW_DECORATION, SET_TILE_ID } from './constants';

export const setStep = stepIndex => ({
  type: SET_STEP,
  stepIndex,
});

export const completed = () => ({
  type: COMPLETED,
});

export const setNewDecoration = decoration => ({
  type: SET_NEW_DECORATION,
  decoration
});


export const setTileId = id => ({
  type: SET_TILE_ID,
  id,
});
