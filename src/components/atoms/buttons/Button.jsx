import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Button(props) {
  const { _onClick, backgroundColor, color, width, height, margin, children } =
    props;

  const styles = {
    backgroundColor,
    color,
    width,
    height,
    margin,
  };

  return (
    <B onClick={_onClick} {...styles}>
      {children}
    </B>
  );
}

Button.propTypes = {
  _onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string || PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.string,
  children: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  backgroundColor: '#C4C4C4',
  color: '#000',
  width: 80,
  height: 30,
  margin: '0px 0px 16px 0px',
};

const B = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.backgroundColor};

  font-size: 12px;
  color: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;

  margin: ${(props) => props.margin};

  cursor: pointer;
`;

export default Button;
