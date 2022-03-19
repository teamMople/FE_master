import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from 'components';

const ProgressStepper = (props) => {
  const { steps, currentStep, backgroundColor, highlightColor } = props;

  const styles = {
    backgroundColor,
    highlightColor,
  };

  return (
    <ProgressBar {...styles}>
      <Highlight {...styles} width={((currentStep + 1) / steps) * 100 + '%'} />
      <Hidden {...styles} width={(currentStep / steps) * 100 + '%'} />
    </ProgressBar>
  );
};

ProgressStepper.propTypes = {
  steps: PropTypes.number,
  currentStep: PropTypes.number,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
};

const ProgressBar = styled.div`
  --color: ${(props) => props.backgroundColor};
  position: relative;
  width: 100%;
  height: 4px;
  background-color: var(--color);
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 1px solid #6e6bf0;
`;

const Highlight = styled.div`
  position: absolute;
  width: ${(props) => props.width};
  height: 100%;
  background-color: ${(props) => props.highlightColor};
  border: none;
  transition: 1s width;
`;

const Hidden = styled.div`
  position: absolute;
  width: ${(props) => props.width};
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  transition: 1s width;
`;

export default ProgressStepper;
