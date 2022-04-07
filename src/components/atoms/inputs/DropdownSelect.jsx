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
  control: (base, { theme }) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: theme.colors.white,
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
  group: (provided, state, { theme }) => ({
    ...provided,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: theme.colors.white,
  }),
  option: (provided, { theme, isFocused, isSelected }) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 500,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: isSelected ? '#F1F1F1' : isFocused ? '#F1F1F1' : '#FFF',
    color: '#282828',
    ':active': {
      backgroundColor: isSelected ? '#F1F1F1' : '#FFF',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#4F4F4F',
    fontWeight: 600,
  }),
};

export default DropdownSelect;
