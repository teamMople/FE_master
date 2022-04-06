import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Grid = ({ overflowY, overflowX, full, ...props }) => {
  return (
    <React.Fragment>
      <GridBox {...props}>{props.children}</GridBox>
    </React.Fragment>
  );
};

Grid.propTypes = {
  children: PropTypes.any,
  padding: PropTypes.string,
  margin: PropTypes.string,
  overflowY: PropTypes.bool,
  overflowX: PropTypes.bool,
  rounded: PropTypes.bool,
  full: PropTypes.bool,
};

Grid.defaltProps = {
  children: null,
  padding: '0px 0px 0px 0px',
  margin: '0px 0px 0px 0px',
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  overflow-x: ${({ overflowX }) => overflowX && 'hidden'};
  overflow-y: ${({ overflowY }) => overflowY && 'hidden'};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => (props.rounded ? '20px' : '')};

  cursor: ${(props) => (props.onClick ? 'pointer' : '')};

  ${(props) =>
    props.isFlex
      ? `
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
        `
      : ``}
  ${(props) =>
    props.isSide
      ? `
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
        `
      : ``}
    ${(props) =>
    props.center
      ? `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
        `
      : ``};

  ${(props) =>
    props.left
      ? `
          display: flex;
          justify-content: flex-start;
        `
      : ``};

  ${(props) =>
    props.right
      ? `
          display: flex;
          justify-content: flex-end;
        `
      : ``};
`;

export default Grid;
