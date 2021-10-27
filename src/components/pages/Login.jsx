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

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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
    const { name, email } = this.state;
    return (
      <section className="App">
        <section className="input-login">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name-input" className="name-input">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              className="inputs"
              id="name-input"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input" className="name-input">
            Email:
            <input
              type="email"
              className="inputs"
              data-testid="input-gravatar-email"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Buttons
            disabled={ !email || !name }
            dataTestid="btn-play"
            id="button-form"
            onClick={ () => this.handleClick('/game') }
            text="Jogar"
            className="gameNext"
          />
          <Link to="/settings">
            <Buttons
              dataTestid="btn-settings"
              id="button-config"
              text="Configurar"
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

Login.propTypes = {
  dispatchSetValue: PropTypes.func,
}.isRequired;

export default connect(null, mapDipatchToProps)(Login);
