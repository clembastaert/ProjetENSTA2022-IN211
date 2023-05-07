import React from 'react';
import './FormPlace.css';

function FormPlace({ type = 'text', label, name, value, onChange }) {
  return (
    <div className="formPlace">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        className="formEntry"
        onChange={onChange}
        required
      />
    </div>
  );
}

export default FormPlace;
