import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { name, email, score, assertions, history } = this.props;
    return (
      <section>
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
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
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

export default connect(
  mapStateToProps,
)(Feedback);
