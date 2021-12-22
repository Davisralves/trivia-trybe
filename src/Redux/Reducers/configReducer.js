/* eslint-disable no-case-declarations */
import { RESET_DEFAULT, SET_NEW_CONFIG } from '../Actions/index';

export const INITIAL_STATE = {
  Category: '',
  Difficult: '',
  questionType: '',
};

const configReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_NEW_CONFIG:
    const { Category, Difficult, questionType } = payload;
    return (
      {
        ...state,
        Category,
        Difficult,
        questionType,
      }
    );

  case RESET_DEFAULT:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default configReducer;
