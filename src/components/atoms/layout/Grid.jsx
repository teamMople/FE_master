import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Grid = ({ ...props }) => {
  return (
    <React.Fragment>
      <GridBox {...props}>{props.children}</GridBox>
    </React.Fragment>
  );
};

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Grid.defaltProps = {
  children: null,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;

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
