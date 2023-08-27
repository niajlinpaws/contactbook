import React from 'react';

function ContactIcon({ className }) {
  return (
    <svg
      className={className + ' icon flat-line'}
      data-name="Flat Line"
      fill="#000"
      height="800"
      viewBox="-2.4 -2.4 28.8 28.8"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="2">
        <path
          fill="#3b82f6"
          d="M18 3H4a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1zm-4 13H8v-1a3 3 0 013-3 2 2 0 112-2 2 2 0 01-2 2 3 3 0 013 3z"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 9h-2V7h2zm0 4h-2v2h2zM11 8a2 2 0 102 2 2 2 0 00-2-2zm3 7a3 3 0 00-3-3h0a3 3 0 00-3 3v1h6zm5 5V4a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1z"
        ></path>
      </g>
    </svg>
  );
}

export default ContactIcon;
