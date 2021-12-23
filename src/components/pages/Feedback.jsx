import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScore } from '../../Redux/Actions/index';
import Header from './Header';
import { savePlayerRank } from '../../services/Api';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      goodResult: 'Mandou bem!',
      badResult: 'Podia ser melhor...',
      questionsAssert: 3,
    };
    this.handleRankingClick = this.handleRankingClick.bind(this);
  }

  handleRankingClick(name, score, email, history) {
    savePlayerRank({ name, score, email });
    history.push('/ranking');
  }

  render() {
    const { goodResult, badResult, questionsAssert } = this.state;
    const { name, email, score, assertions, history, resetReducerScore } = this.props;
    return (
      <section className="App paper container-lg">
        <Header />
        <div>
          <h3 data-testid="feedback-text">
            { assertions >= questionsAssert ? goodResult : badResult }
          </h3>
        </div>
        <section>
          <h1 data-testid="feedback-total-score">
            { score }
            🏆
          </h1>
          <h2 data-testid="feedback-total-question">
            { `acertou ${assertions}` }
          </h2>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          className="settingsButton"
          onClick={ () => { resetReducerScore(); history.push('/'); } }
        >
          Home
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          className="settingsButton"
          onClick={ () => { resetReducerScore(); history.push('/game'); } }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          className="settingsButton"
          onClick={ () => this.handleRankingClick(name, score, email, history) }
        >
          Ranking
        </button>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.userReducer.player.name,
  email: state.userReducer.player.gravatarEmail,
  score: state.userReducer.player.score,
  assertions: state.userReducer.player.assertions,
});

const mapDispatchToProps = (dispatch) => (
  {
    resetReducerScore: () => dispatch(resetScore()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
