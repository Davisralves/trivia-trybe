import {
  SET_USER_DATA,
  SET_FEEDBACK,
  SET_BUTTON_COLLOR,
  SET_SCORE } from '../Actions/index';

const INITIAL_STATE = {
  email: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  colors: {
    wrongColor: '',
    rigthColor: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SET_FEEDBACK:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case SET_BUTTON_COLLOR:
    return {
      ...state,
      colors: {
        wrongColor: action.payload,
        rigthColor: action.payload,
      },
    };
  case SET_SCORE:
    return {
      ...state,
      player: {
        name: action.payload.player.name,
        assertions: action.payload.player.assertions,
        score: action.payload.player.score,
        gravatarEmail: action.payload.player.gravatarEmail,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
