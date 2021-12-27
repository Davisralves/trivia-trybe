/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import categorys from './Helpers/categorys';
import DropDown from './Helpers/DropDown';
import { INITIAL_STATE } from '../../Redux/Reducers/configReducer';
import { setNewConfig, resetDefault } from '../../Redux/Actions/index';
import { requestTriviaApi } from '../../services/Api';
import './css/Settings.css';

// eslint-disable-next-line max-lines-per-function
function Settings(props) {
  const difficults = ['Any', 'Easy', 'Medium', 'Hard'];
  const types = ['Any', 'Multiple Choice', 'True or False'];
  const [settings, setSettings] = useState(INITIAL_STATE);
  const [validated, setValidated] = useState(true);
  const [loading, setLoading] = useState(false);
  const { dispatchDefaultSettings, dispatchSettings, history } = props;

  const saveSettings = async () => {
    const { Category, Difficult, questionType } = settings || INITIAL_STATE;
    setLoading(true);
    const response = await requestTriviaApi(`https://opentdb.com/api.php?amount=5&category=${Category}&difficulty=${Difficult}&type=${questionType}&token=`);
    setLoading(false);
    if (!response) { setValidated(false); }
    if (response) {
      const { response_code: responseCode } = response;
      if (responseCode !== 0) {
        setValidated(false);
      } else {
        dispatchSettings(settings);
      }
    }
  };

  const mainPage = (
    <main>
      <h1 data-testid="settings-title" className="textAlingCenter">Configuration</h1>
      <div className="flexboxRow">
        <DropDown
          title="Category"
          items={ categorys }
          setSettings={ setSettings }
          settings={ settings }
        />
        <DropDown
          title="Difficult"
          items={ difficults }
          setSettings={ setSettings }
          settings={ settings }
        />
        <DropDown
          title="Question Type"
          items={ types }
          setSettings={ setSettings }
          settings={ settings }
        />
      </div>
      <div className="flexboxCenter">
        <button
          type="button"
          className="settingsButton"
          onClick={ () => history.push('/') }
          disabled={ loading }
        >
          Home
        </button>

        <button
          type="button"
          onClick={ () => { dispatchDefaultSettings(); setSettings(INITIAL_STATE); } }
          className="settingsButton"
          disabled={ loading }
        >
          Reset Default
        </button>
        <button
          type="button"
          onClick={ saveSettings }
          className="settingsButton"
          disabled={ loading }
        >
          Save new Settings
        </button>
        { loading ? <h3>Loading...</h3> : <span />}
      </div>
    </main>
  );

  const handleErroPage = (
    <main>
      <div className="flexboxCenter">
        <h3>
          We don´t have questions for this specific set of
          <em> Rules</em>
          {' '}
          Please try another set.
        </h3>
      </div>
      <div className="flexboxCenter">
        <button
          type="button"
          onClick={ () => { dispatchDefaultSettings(); setValidated(true); } }
        >
          Reset Default
        </button>
      </div>

    </main>);

  return (
    validated ? mainPage : handleErroPage
  );
}

Settings.propTypes = {
  dispatchDefaultSettings: PropTypes.func.isRequired,
  dispatchSettings: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchSettings: (settingsState) => dispatch(setNewConfig(settingsState)),
    dispatchDefaultSettings: () => dispatch(resetDefault()),
  }
);

export default connect(null, mapDispatchToProps)(Settings);
