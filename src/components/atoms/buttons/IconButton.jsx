import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

const IconButton = ({ src, alt, backgroundColor, onClick }) => {
  return (
    <CustomButton backgroundColor={backgroundColor} onClick={onClick}>
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
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10em;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0)'};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default IconButton;
