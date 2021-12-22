import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../7FbY.gif';
import { setfeedback } from '../../Redux/Actions';
import { requestToken } from '../../services/Api';
import getGravatar from '../../services/getGravatar';
import Buttons from '../Buttons';

class Login extends Component {
  constructor(props) {
    super(props);
    const { player: { name, gravatarEmail } } = props;
    this.state = {
      player: { name, email: gravatarEmail },
    };
    console.log(name, gravatarEmail);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState((state) => (
      { player: {
        ...state.player,
        [name]: value,
      } }));
  }

  async handleClick(path) {
    const { email } = this.state;
    const { dispatchSetValue, history } = this.props;
    dispatchSetValue(this.state);
    await requestToken();
    getGravatar(email);
    history.push(path);
  }

  render() {
    const { player: { name, email } } = this.state;
    return (
      <section className="App">
        <section className="input-login">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name-input" className="name-input">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              text={ name }
              placeholder="Name"
              className="inputs"
              id="name-input"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input" className="name-input">
            <input
              type="email"
              className="inputs"
              data-testid="input-gravatar-email"
              name="email"
              id="email-input"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Buttons
            disabled={ !email || !name }
            dataTestid="btn-play"
            id="button-form"
            onClick={ () => this.handleClick('/game') }
            text="Play"
            className="gameNext"
          />
          <Link to="/settings">
            <Buttons
              dataTestid="btn-settings"
              id="button-config"
              text="Configuration"
            />
          </Link>
        </section>
      </section>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  dispatchSetValue: (state) => {
    dispatch(setfeedback(state));
  },
});

const mapStateToProps = ({ userReducer }) => ({
  player: userReducer.player,
});
Login.propTypes = {
  dispatchSetValue: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDipatchToProps)(Login);
