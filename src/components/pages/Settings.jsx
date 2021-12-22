import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import categorys from './Helpers/categorys';
import DropDown from './Helpers/DropDown';
import { INITIAL_STATE } from '../../Redux/Reducers/configReducer';
import { setNewConfig, resetDefault } from '../../Redux/Actions/index';
import './css/Settings.css';

function Settings(props) {
  const difficults = ['Any', 'Easy', 'Medium', 'Hard'];
  const types = ['Any', 'Multiple Choice', 'True or False'];
  const [settings, setSettings] = useState(INITIAL_STATE);
  const { dispatchDefaultSettings, dispatchSettings } = props;
  return (
    <main>
      <h1 data-testid="settings-title" className="textAlingCenter">Configurações</h1>
      <div className="flexboxRow">
        <DropDown title="Category" items={ categorys } setSettings={ setSettings } />
        <DropDown title="Difficult" items={ difficults } setSettings={ setSettings } />
        <DropDown title="Question Type" items={ types } setSettings={ setSettings } />
      </div>
      <div className="flexboxCenter">
        <button
          type="button"
          onClick={ dispatchDefaultSettings }
        >
          Reset Default
        </button>
        <button
          type="button"
          onClick={ () => dispatchSettings(settings) }
        >
          Save new Settings

        </button>
      </div>
    </main>
  );
}

Settings.propTypes = {
  dispatchDefaultSettings: PropTypes.func.isRequired,
  dispatchSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  { dispatchSettings: (settingsState) => dispatch(setNewConfig(settingsState)),
    dispatchDefaultSettings: () => dispatch(resetDefault()) }
);

export default connect(null, mapDispatchToProps)(Settings);
