import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Wrapper(props) {
  const { isFlex, float, padding, background, children } = props;

  const styles = {
    isFlex,
    padding,
    background,
    float,
  };

  return <WRAPPER {...styles}>{children}</WRAPPER>;
}

Wrapper.propTypes = {
  isFlex: PropTypes.bool,
  float: PropTypes.string,
  padding: PropTypes.any,
  background: PropTypes.string,
  children: PropTypes.any,
};

Wrapper.defaltProps = {
  children: null,
  isFlex: false,
  background: null,
  float: 'none',
  padding: false,
};

const WRAPPER = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 375px;

  box-sizing: border-box;
  float: ${(props) => props.float};

  overflow-x: hidden;
  overflow-y: hidden;

  ${(props) => (props.padding ? `padding: ${props.padding}` : '')}
  ${(props) =>
    props.background ? `background-color: ${props.background}` : ''}

  ${(props) =>
    props.isFlex
      ? `display:flex; 
				align-items: center; 
				justify-content:space-between;
				flex-wrap: wrap;
			`
      : ''}
`;

export default Wrapper;
