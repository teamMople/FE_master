import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../text/Text';

function Input({ ...props }) {
  return (
    <React.Fragment>
      <Text bold>{props.label}</Text>
      <I {...props}>{props.children}</I>
    </React.Fragment>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  children: null,
};

const I = styled.input`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border: 1px solid #d5d8db;
  border-radius: 50px;
  padding: 15px;
  font-size: 14px;
`;

export default Input;
