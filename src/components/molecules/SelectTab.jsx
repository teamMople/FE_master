import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectTab = ({ active, children, ...props }) => {
  return (
    <Tab active={active} {...props}>
      {children}
    </Tab>
  );
};

SelectTab.defaultProps = {
  active: false,
  children: undefined,
};

SelectTab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
};

// 디자인 시안 나오면 수정 예정
const Tab = styled.div`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.secondary};
  color: ${({ active, theme }) => (active ? 'blue' : '#ddd')};
  border: 1px solid #ddd;
  padding: 10px;
`;
export default SelectTab;
