import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StandardInput = ({ fluid, backgroundColor, ...props }) => {
  return (
    <div>
      <CustomInput fluid={fluid} backgroundColor={backgroundColor} {...props} />
    </div>
  );
};

StandardInput.propTypes = {
  backgroundColor: PropTypes.string,
  fluid: PropTypes.bool,
};

StandardInput.defaultProps = {
  placeholder: 'placeholder...',
};

const CustomInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  width: ${({ fluid }) => (fluid ? '100%' : 'auto')};
  padding: 12px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    font-weight: ${(props) => (props.bold ? 600 : 500)};
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

export default StandardInput;
