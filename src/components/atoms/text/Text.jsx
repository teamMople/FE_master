import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = ({
  bold,
  semiBold,
  medium,
  regular,
  light,
  color,
  left,
  center,
  right,
  onClick,
  size,
  small,
  large,
  ...props
}) => {
  return (
    <P
      bold={bold}
      semiBold={semiBold}
      medium={medium}
      regular={regular}
      light={light}
      color={color}
      left={left}
      center={center}
      right={right}
      onClick={onClick}
      size={size}
      small={small}
      large={large}
      {...props}
    >
      {props.children}
    </P>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  bold: PropTypes.bool,
  medium: PropTypes.bool,
  semiBold: PropTypes.bool,
  regular: PropTypes.bool,
  light: PropTypes.bool,
  color: PropTypes.string,
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

Text.defaultProps = {
  children: '',
};

const P = styled.div`
  color: ${({ color, theme }) => (color ? color : theme.colors.black)};
  font-family: ${(props) => props.font};
  font-size: ${({ small, size }) => (size ? size : small ? '12px' : '14px')};
  font-weight: ${(props) =>
    props.bold
      ? '700'
      : props.semiBold
      ? '600'
      : props.medium
      ? '500'
      : props.regular
      ? '400'
      : props.light
      ? '300'
      : '500'};
  line-height: ${(props) => props.lineHeight};
  text-align: ${({ right, center }) =>
    center ? 'center' : right ? 'right' : 'left'};
  cursor: ${({ onClick }) => onClick && 'pointer'};
  word-break: break-all;
`;

export default Text;
