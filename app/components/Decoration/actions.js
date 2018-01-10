import { SET_STEP, COMPLETED, SET_NEW_DECORATION } from './constants';

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
