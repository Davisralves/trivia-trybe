import PropTypes from 'prop-types';
import React from 'react';
import '../css/Settings.css';

export default function DropDown(props) {
  const { title, items, setSettings } = props;

  const setSettingsState = (value) => {
    if (title === 'Question Type') {
      setSettings((state) => ({ ...state, questionType: value }));
    } else {
      setSettings((state) => ({ ...state, [title]: value }));
    }
  };

  return (
    <label htmlFor="dropdown" className="label">
      {title}
      :
      {' '}
      <select
        name="dropdown"
        className="dropdown"
        onChange={ ({ target: { value } }) => setSettingsState(value) }
      >
        {items.map((item, key) => <option key={ key }>{item}</option>)}
      </select>
    </label>
  );
}

DropDown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSettings: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
