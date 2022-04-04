import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconButton = ({
  src,
  alt,
  backgroundColor,
  onClick,
  small,
  medium,
  large,
  ...props
}) => {
  return (
    <CustomButton
      backgroundColor={backgroundColor}
      onClick={onClick}
      small={small}
      medium={medium}
      large={large}
      {...props}
    >
      <img src={src} alt={alt} />
    </CustomButton>
  );
};

IconButton.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};
const CustomButton = styled.button`
  width: ${({ small, medium, large }) =>
    small ? '16px' : medium ? '24px' : large ? '30px' : '16px'};
  height: ${({ small, medium, large }) =>
    small ? '16px' : medium ? '24px' : large ? '30px' : '16px'};
  border: none;
  border-radius: 10em;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0)'};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 200%;
    border-radius: 10em;
  }

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default IconButton;
