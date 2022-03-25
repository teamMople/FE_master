import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DropdownSelect = ({ ...props }) => {
  return (
    <Select
      {...props}
      isSearchable={false}
      styles={dropdownSelectStyles}
      components={animatedComponents}
    />
  );
};

const animatedComponents = makeAnimated();

const dropdownSelectStyles = {
  control: (base) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    paddingLeft: 13,
    paddingRight: 13,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#6E6BF0',
    fontWeight: 600,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#4F4F4F',
    transform: state.isFocused ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
  }),
  group: (provided, state) => ({
    ...provided,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: state.isSelected ? '#4F4F4F' : '#FFF',
  }),
  option: (provided, state) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 500,
    paddingLeft: 23,
    paddingRight: 23,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#4F4F4F',
    fontWeight: 600,
  }),
};

export default DropdownSelect;
