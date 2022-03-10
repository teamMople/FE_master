import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const { isFlex, float, width, padding, margin, background, children } = props;

  const styles = {
    isFlex: isFlex,
    width: width,
    padding: padding,
    margin: margin,
    background: background,
    float: float,
  };

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.propTypes = {
  isFlex: PropTypes.bool,
  float: PropTypes.bool,
  width: PropTypes.any,
  padding: PropTypes.any,
  margin: PropTypes.any,
  background: PropTypes.string,
  children: PropTypes.any,
};

Grid.defaltProps = {
  children: null,
  isFlex: false,
  width: '10%',
  padding: false,
  margin: false,
  background: null,
  float: 'none',
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
  float: ${(props) => props.float};

  ${(props) => (props.padding ? `padding: ${props.padding}` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')}
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

export default Grid;
