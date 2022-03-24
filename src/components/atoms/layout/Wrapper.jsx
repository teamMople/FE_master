import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

function Wrapper({ ...props }) {
  return <W {...props}>{props.children}</W>;
}

Wrapper.propTypes = {
  children: PropTypes.any,
};

Wrapper.defaltProps = {
  children: null,
};

const W = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;

  float: ${(props) => props.float};

  overflow-x: hidden;
  overflow-y: auto;

  ${(props) =>
    props.padding
      ? css`
          padding: ${props.padding};
        `
      : ''}
  ${(props) =>
    props.backgroundColor
      ? css`
          background-color: ${props.backgroundColor};
        `
      : ''}
`;

export default Wrapper;
