import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from './Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      goodResult: 'Mandou bem!',
      badResult: 'Podia ser melhor...',
      questionsAssert: 3,
    };
  }

  render() {
    const { goodResult, badResult, questionsAssert } = this.state;
    const { score, assertions, history } = this.props;
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
            { assertions <= 0 ? 'Não acertou nenhuma pergunta!'
              : `Acertou ${assertions} perguntas`}
          </h2>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
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
  score: state.userReducer.player.score,
  assertions: state.userReducer.player.assertions,
});

export default connect(
  mapStateToProps,
)(Feedback);
