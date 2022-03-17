import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Button({ ...props }) {
  return <B {...props}>{props.children}</B>;
}

Button.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Button.defaultProps = {
  children: null,
};

const B = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
  font-size: 14px;
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin};
  cursor: pointer;
`;

export default Button;
