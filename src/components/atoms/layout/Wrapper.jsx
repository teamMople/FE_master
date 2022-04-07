import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = forwardRef(({ full, ...props }, ref) => {
  return (
    <W full={full} {...props} ref={ref}>
      {props.children}
    </W>
  );
});

Wrapper.displayName = 'Wrapper';

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
