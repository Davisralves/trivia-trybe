import React from 'react';
import '../css/Config.css';

export default function DropDown(props) {
  const { title, items } = props;
  return (
    <label htmlFor="dropdown" className="label">
      {title}
      :
      {' '}
      <select name="dropdown" className="dropdown">
        {items.map((item, key) => <option key={ key }>{item}</option>)}
      </select>
    </label>
  );
}
