import { RESET_DEFAULT, SET_NEW_CONFIG } from '../Actions/index';

const INITIAL_STATE = {
  category: '',
  difficult: '',
  questionType: '',
};

const configReducer = (state = INITIAL_STATE, { type, payload }) => {
  const { category, difficult, questionType } = payload;
  switch (type) {
  case SET_NEW_CONFIG:
    return (
      {
        ...state,
        category,
        difficult,
        questionType,
      }
    );

  case RESET_DEFAULT:
    return INITIAL_STATE;
  default:
    return state;
  }
};
