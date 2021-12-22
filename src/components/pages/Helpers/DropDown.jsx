import PropTypes from 'prop-types';
import React from 'react';
import '../css/Settings.css';
import category from './categorys';

// eslint-disable-next-line max-lines-per-function
export default function DropDown(props) {
  const { title, items, setSettings } = props;

  const saveQuestionType = (value) => {
    switch (value) {
    case 'Multiple Choice':
      setSettings((state) => ({ ...state, questionType: 'multiple' }));
      break;
    case 'True or False':
      setSettings((state) => ({ ...state, questionType: 'boolean' }));
      break;
    default:
      setSettings((state) => ({ ...state, questionType: '' }));
    }
  };

  const saveDifficult = (value) => {
    if (value === 'Any') {
      setSettings((state) => ({ ...state, Difficult: '' }));
    } else {
      setSettings((state) => ({ ...state, Difficult: value.toLowerCase() }));
    }
  };

  const saveCategory = (value) => {
    if (value === 'Any') {
      setSettings((state) => ({ ...state, Category: '' }));
    } else {
      const categoryBase = 8;
      const categoryID = category.indexOf(value, 1) + categoryBase;
      setSettings((state) => ({ ...state, Category: categoryID }));
    }
  };

  const setSettingsState = (value) => {
    if (title === 'Question Type') saveQuestionType(value);
    if (title === 'Difficult') saveDifficult(value);
    if (title === 'Category') saveCategory(value);
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
