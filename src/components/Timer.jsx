import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setScore } from '../Redux/Actions';
import { saveScore } from '../services/Api';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
      pause: props.pauseTimer,
    };
    this.subtractTimer = this.subtractTimer.bind(this);
    this.resetTimerFunc = this.resetTimerFunc.bind(this);
  }

  async componentDidMount() {
    const seg = 1000;
    setInterval(this.subtractTimer, seg);
  }

  resetTimerFunc() {
    const { resetTimer, pauseTimer } = this.props;
    if (resetTimer) {
      this.setState({
        counter: 30,
        pause: pauseTimer,
      });
    }
  }

  subtractTimer() {
    const { pauseTimer } = this.props;
    this.setState(({ counter, pause }) => {
      if (!pause) {
        return counter > 0
          ? ({ counter: counter - 1, pause: pauseTimer })
          : ({ counter: 0 });
      } return ({ counter, pause });
    });
  }

  calculateDificult(dificuldade) {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (dificuldade) {
    case 'hard':
      return hard;
    case 'medium':
      return medium;
    case 'easy':
      return easy;
    default: return easy;
    }
  }

  points(timer, dificuldade) {
    const base = 10;
    const dificult = this.calculateDificult(dificuldade);
    return base + timer * dificult;
  }

  render() {
    const {
      difficulty,
      correctClick,
      setCorrectClick,
      dispatchCount,
      resetTimer,
      player } = this.props;
    const { counter } = this.state;
    if (correctClick) {
      const score = this.points(counter, difficulty);
      player.score += score;
      player.assertions += 1;
      saveScore(player);
      dispatchCount({ player });
      setCorrectClick(false);
    }
    if (resetTimer) {
      this.resetTimerFunc();
    }
    return (
      <h3>
        Tempo:
        {' '}
        {counter}
      </h3>
    );
  }
}

Timer.propTypes = {
  correctClick: PropTypes.bool.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  difficulty: PropTypes.number.isRequired,
  dispatchCount: PropTypes.func.isRequired,
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  setCorrectClick: PropTypes.func.isRequired,
  pauseTimer: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCount: (player) => {
    dispatch(setScore(player));
  },
});

const mapStateToProps = (state) => ({
  player: state.userReducer.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
