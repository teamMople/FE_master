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
      {...props}
    >
      {props.children}
    </B>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.any,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  fluid: PropTypes.bool,
  width: PropTypes.any,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  color: PropTypes.any,
  shape: PropTypes.oneOf(['circle', 'round']),
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
    size === 'small' ? '4px 8px' : size === 'large' ? '8px 12px' : '6px 10px'};
  /*line-height: ${({ size }) =>
    size === 'small' ? '16px' : size === 'large' ? '22px' : '6px 10px'};*/
  height: ${(props) => props.height}px;
  background-color: ${({ backgroundColor, theme, primary, secondary }) =>
    backgroundColor
      ? backgroundColor
      : primary
      ? theme.colors.primaryYellow
      : secondary
      ? theme.colors.blue
      : theme.colors.white};
  color: ${({ color, primary, secondary, theme }) =>
    primary ? theme.colors.black : secondary ? theme.colors.white : color};
  border-radius: 10em;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary, secondary }) =>
      primary ? 'rgb(217,191,116)' : secondary ? 'rgb(94,92,206)' : 'none'};
    transition: all 0.2s ease;
  }
`;

export default Button;
