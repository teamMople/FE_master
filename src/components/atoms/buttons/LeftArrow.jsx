import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LeftArrow = (props) => {
  return (
    <div {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 17L9.5 12L14.5 7"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

LeftArrow.propTypes = {
  _onclick: PropTypes.func,
};

export default LeftArrow;
