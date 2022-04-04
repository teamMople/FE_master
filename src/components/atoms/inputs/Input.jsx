import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../text/Text';

function Input({
  label,
  children,
  margin,
  width,
  height,
  backgroundColor,
  fluid,
  disabled,
  eyeIconRender,
  ...props
}) {
  const [eyeIconClicked, setEyeIconClicked] = useState(false);

  return (
    <InputWrapper margin={margin} backgroundColor={backgroundColor}>
      {label && <Text bold>{label}</Text>}
      <I
        width={width}
        height={height}
        fluid={fluid}
        backgroundColor={backgroundColor}
        disabled={disabled}
        {...props}
      >
        {props.children}
      </I>
      <EyeIcon eyeIconRender={eyeIconRender} />
    </InputWrapper>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  eyeIconRender: PropTypes.bool,
};

Input.defaultProps = {
  label: null,
  bold: false,
  padding: '0px',
  children: null,
};

const InputWrapper = styled.div`
  margin: ${({ margin }) => (margin ? margin : '8px 0')};
`;
const I = styled.input`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.colors.white};
  width: ${(fluid, width) => (fluid ? '100%' : width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '52px')};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50px;
  /*padding: ${(props) => props.padding};*/
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  padding: 15px 23px;
  font-weight: ${(props) => (props.bold ? 600 : 500)};

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    font-weight: ${(props) => (props.bold ? 600 : 500)};
  }

  &:disabled {
    &::placeholder {
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;

const EyeIcon = styled.div``;

export default Input;
