import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../7FbY.gif';
import { saveScore, getGravatar } from '../../services/Api';

class Header extends Component {
  render() {
    const { player, email, score, statePlayer } = this.props;
    saveScore(statePlayer);
    return (
      <header className="header-questions">
        <div>
          <img src={ logo } className="logo-header" alt="logo" />
        </div>
        <div className="gravatal-img">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${getGravatar(email)}` }
            alt="player"
          />
          <p
            data-testid="header-player-name"
          >
            { player }
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.userReducer.player.name,
  email: state.userReducer.player.gravatarEmail,
  score: state.userReducer.player.score,
  statePlayer: state.userReducer.player,
});

export default connect(mapStateToProps)(Header);
