/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './DropdownMenuItem.css';

function DropdownMenuItem({ bool, setBool, title, children }) {
  return (
    <div>
      <div
        className="list"
        onClick={() => {
          setBool(!bool);
        }}
      >
        <i className="fa-regular fa-square-caret-down"></i>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default DropdownMenuItem;
