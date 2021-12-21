import {  SET_FEEDBACK, SET_SCORE } from '../Actions/index';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_FEEDBACK:
    const { name, email: gravatarEmail } = payload;
    return {
      ...state,
      player: {
        ...state.player,
        name,
        gravatarEmail,
      },
    };
  case SET_SCORE:
    const { player } = payload;
    return {
      ...state,
      player: {
        name: player.name,
        assertions: player.assertions,
        score: player.score,
        gravatarEmail: player.gravatarEmail,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
