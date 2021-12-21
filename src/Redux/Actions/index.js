export const SET_FEEDBACK = 'SET_FEEDBACK';
export const setfeedback = (payload) => ({
  type: SET_FEEDBACK, payload,
});

export const SET_SCORE = 'SET_SCORE';
export const setScore = (payload) => ({
  type: SET_SCORE, payload,
});

export const SET_NEW_CONFIG = 'SET_NEW_CONFIG';
export const setNewConfig = (payload) => ({
  type: 'SET_NEW_CONFIG', payload,
});

export const RESET_DEFAULT = 'RESET_DEFAULT';
export const resetDefault = (payload) => ({
  type: RESET_DEFAULT, payload,
});
