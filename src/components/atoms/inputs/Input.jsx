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
  const [isHidden, setIsHidden] = useState(true);

  return (
    <InputWrapper margin={margin} backgroundColor={backgroundColor}>
      {label && <Text bold>{label}</Text>}
      <EyeIcon
        eyeIconRender={eyeIconRender}
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        {isHidden && <img src="/asset/icons/password_hidden.svg" />}
        {!isHidden && <img src="/asset/icons/password_seen.svg" />}
      </EyeIcon>
      <I
        width={width}
        height={height}
        fluid={fluid}
        backgroundColor={backgroundColor}
        disabled={disabled}
        type={isHidden ? 'password' : 'text'}
        {...props}
      >
        {props.children}
      </I>
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
  position: relative;
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

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  display: ${(props) => (props.eyeIconRender ? 'flex' : 'none')};
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default Input;
