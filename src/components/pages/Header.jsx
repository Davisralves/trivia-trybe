import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

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
    const { player, emailPLayer, score, assertions } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.getGravatar(emailPLayer)}` }
          alt="player"
        />
        <h3
          data-testid="header-player-name"
        >
          { player }
        </h3>
        <p data-testid="header-score">
          { score }
          🏆
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string,
  emailPLayer: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.userReducer.player.name,
  emailPLayer: state.userReducer.player.email,
  score: state.userReducer.player.score,
});

export default connect(mapStateToProps)(Header);
