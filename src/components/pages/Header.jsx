import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import logo from '../../7FbY.gif';
import { saveScore } from '../../services/Api';

class Header extends Component {
  constructor() {
    super();
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar(email) {
    const gravatar = md5(email).toString();
    return gravatar;
  }

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
            src={ `https://www.gravatar.com/avatar/${this.getGravatar(email)}` }
            alt="player"
          />
          <p
            data-testid="header-player-name"
          >
            { player }
          </p>
          <p data-testid="header-score">
            { score }
            { console.log(`score:${score}`)}
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
