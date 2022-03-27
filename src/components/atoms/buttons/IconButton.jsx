import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconButton = ({ src, alt, backgroundColor, onClick, ...props }) => {
  return (
    <CustomButton
      backgroundColor={backgroundColor}
      onClick={onClick}
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
};
const CustomButton = styled.button`
  width: 16px;
  height: 16px;
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

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default IconButton;
