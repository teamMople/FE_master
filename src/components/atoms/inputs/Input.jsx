import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../text/Text';

function InputText(props) {
  const {
    _onChange,
    _type,
    width,
    height,
    label,
    placeholder,
    margin,
    children,
  } = props;

  const styles = {
    width,
    height,
    margin,
  };

  return (
    <>
      <Text bold>{label}</Text>
      <INPUT
        onChange={_onChange}
        type={_type}
        {...styles}
        placeholder={placeholder}
      >
        {children}
      </INPUT>
    </>
  );
}

InputText.propTypes = {
  _onChange: PropTypes.func,
  _type: PropTypes.string,
  width: PropTypes.string || PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  children: PropTypes.string,
};

InputText.defaultProps = {
  width: '100%',
  height: 49,
  children: null,
  label: null,
  placeholder: null,
  margin: '0px 0px 16px 0px',
};

const INPUT = styled.input`
  width: calc(${(props) => props.width} - 8px);
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin};
`;

export default InputText;
