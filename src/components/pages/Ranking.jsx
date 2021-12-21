import React from 'react';
import PropTypes from 'prop-types';
import { getPlayersRank, getGravatar } from '../../services/Api';
import './css/Ranking.css';

const playerRank = (name, score, email) => (
  <div>
    <h5>{name}</h5>
    <img
      className="gravatarImg"
      src={ `https://www.gravatar.com/avatar/${getGravatar(email)}` }
      alt="player"
    />
    <h5>{score}</h5>
  </div>

);

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main className="App paper container-lg">
        <h1 data-testid="ranking-title"> Ranking </h1>
        {getPlayersRank()
          .map(({ name, score, picture }) => playerRank(name, score, picture))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
