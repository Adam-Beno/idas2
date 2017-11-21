import { createSelector } from 'reselect';

const registerSelector = state => state.get('register');

export const ageRequirement = createSelector(registerSelector, app => app.get('ageRequirementMet'));
export const errorMessages = createSelector(registerSelector, app => app.get('errorMessages'));
