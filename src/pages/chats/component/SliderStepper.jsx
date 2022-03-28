import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SliderStepper = ({ value, onChange }) => {
  return (
    <SliderWrapper
      onChange={onChange}
      type="range"
      min={2}
      max={10}
      step={1}
      value={value}
    />
  );
};

SliderStepper.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

const SliderWrapper = styled.input`
  width: 100%;
  -webkit-appearance: none;
  outline: none;
  box-shadow: none;
  height: 10px;
  border-radius: 10em;
  //background-color: ${({ theme }) => theme.colors.gray};
  //overflow: hidden;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    //cursor: pointer;
    //border-radius: 10em;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border: 1px solid ${({ theme }) => theme.colors.primaryYellow};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10em;
    //box-shadow: -100vw 0 0 100vw ${({ theme }) => theme.colors.primaryYellow};
  }
`;
export default SliderStepper;
