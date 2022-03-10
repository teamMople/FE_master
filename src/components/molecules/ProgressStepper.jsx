import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Text } from '../atoms';

const ProgressStepper = (props) => {
  const { steps, currentStep, stepLabels } = props;
  return;
};

ProgressStepper.propTypes = {
  steps: PropTypes.number,
  currentStep: PropTypes.number,
  stepLabels: PropTypes.array,
};

export default ProgressStepper;
