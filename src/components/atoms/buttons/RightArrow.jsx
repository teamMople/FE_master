import React from 'react';
import styled, { css } from 'styled-components';

const RightArrow = (props) => {
  return (
    <ArrowWrapper {...props}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path {...props} d="M9.5 7L14.5 12L9.5 17" />
      </Svg>
    </ArrowWrapper>
  );
};

const ArrowWrapper = styled.div``;
const Svg = styled.svg``;

const Path = styled.path`
  ${(props) =>
    props.active
      ? css`
          stroke: #4f4f4f;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        `
      : css`
          stroke: transparent;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        `}
`;

export default RightArrow;
