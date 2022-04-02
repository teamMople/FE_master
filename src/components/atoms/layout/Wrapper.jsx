import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

function Wrapper({ full, ...props }) {
  return (
    <W full={full} {...props}>
      {props.children}
    </W>
  );
}

Wrapper.propTypes = {
  children: PropTypes.any,
  full: PropTypes.bool,
};

Wrapper.defaltProps = {
  children: null,
};

const W = styled.div`
  position: relative;
  width: 100%;
  height: ${({ full }) => (full ? '100%' : 'calc(100% - 54px)')};
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
