import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

const Heart = (props) => {
  const { size, active, _onClick } = props;

  const styles = {
    size: size,
    active: active,
  };

  return (
    <Svg
      onClick={_onClick}
      {...styles}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <Path
        {...styles}
        d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
      />
    </Svg>
  );
};

Heart.propTypes = {
  _onClick: PropTypes.func,
  size: PropTypes.number,
  active: PropTypes.bool,
};

Heart.defaultProps = {
  size: 30,
  active: true,
};

const Svg = styled.svg`
  height: ${(props) => props.size}px;
  cursor: pointer;
`;

const Path = styled.path`
  ${(props) =>
    props.active
      ? css`
          fill: #ffacac;
        `
      : css`
          fill: #eee;
        `}
`;

export default Heart;
