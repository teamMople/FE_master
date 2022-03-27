import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Button({
  backgroundColor,
  size,
  fluid,
  width,
  primary,
  secondary,
  color,
  shape,
  disabled,
  ...props
}) {
  return (
    <B
      backgroundColor={backgroundColor}
      size={size}
      fluid={fluid}
      width={width}
      primary={primary}
      secondary={secondary}
      color={color}
      shape={shape}
      disabled={disabled}
      {...props}
    >
      {props.children}
    </B>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.any,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  fluid: PropTypes.bool,
  width: PropTypes.any,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  color: PropTypes.any,
  shape: PropTypes.oneOf(['circular', 'rounded']),
};

Button.defaultProps = {
  children: null,
  size: 'large',
};

const B = styled.button`
  width: ${({ width, fluid }) => (width ? width : fluid ? '100%' : width)};
  min-width: ${({ size }) =>
    size === 'small' ? '66px' : size === 'large' ? '148px' : '100px'};
  min-height: ${({ size }) =>
    size === 'small' ? '24px' : size === 'large' ? '38px' : '30px'};
  padding: ${({ size }) =>
    size === 'small' ? '8px 16px' : size === 'large' ? '8px 16px' : '8px 16px'};
  line-height: 1;
  height: ${(props) => props.height};
  background-color: ${({ backgroundColor, theme, primary, secondary }) =>
    backgroundColor
      ? backgroundColor
      : primary
      ? theme.colors.primaryYellow
      : secondary
      ? theme.colors.blue
      : theme.colors.backgroundGray};
  color: ${({ primary, secondary, theme, color }) =>
    color
      ? color
      : primary
      ? theme.colors.black
      : secondary
      ? theme.colors.white
      : theme.colors.blue};
  border-radius: ${({ shape }) => (shape === 'rounded' ? '10px' : '10em')};
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin};
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
    color: ${({ theme }) => theme.colors.gray};
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ primary, secondary }) =>
      primary ? 'rgb(217,191,116)' : secondary ? 'rgb(94,92,206)' : 'none'};
    transition: all 0.2s ease;
  }
`;

export default Button;
