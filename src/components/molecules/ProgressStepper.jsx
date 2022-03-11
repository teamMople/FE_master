import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from '../atoms';

const ProgressStepper = (props) => {
  const { steps, currentStep, backgroundColor, highlightColor } = props;

  const styles = {
    backgroundColor,
    highlightColor,
  };

  return (
    <React.Fragment>
      <ProgressBar {...styles}>
        <Highlight
          {...styles}
          width={((currentStep + 1) / steps) * 100 + '%'}
        />
      </ProgressBar>
    </React.Fragment>
  );
};

ProgressStepper.propTypes = {
  steps: PropTypes.number,
  currentStep: PropTypes.number,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
};

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
`;

const Highlight = styled.div`
  width: ${(props) => props.width};
  height: 4px;
  background-color: ${(props) => props.highlightColor};
  transition: 1s width;
`;

export default ProgressStepper;
