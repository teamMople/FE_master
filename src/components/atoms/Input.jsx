import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from '../elements';

function Input(props) {
  const { _onChange, _type, width, height, label, placeholder, children } =
    props;

  const styles = {
    width,
    height,
  };

  return (
    <>
      <Text bold>{label}</Text>
      <I
        onChange={_onChange}
        type={_type}
        {...styles}
        placeholder={placeholder}
      >
        {children}
      </I>
    </>
  );
}

Input.

Input.defaultProps = {
  width: '100%',
  height: 30,
  children: null,
  label: null,
  placeholder: null,
};

const I = styled.input`
  width: calc(${(props) => props.width} - 8px);
  height: ${(props) => props.height}px;
`;

export default Input;
