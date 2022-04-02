import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToggleButton = ({ active, onClick }) => {
  return (
    <ToggleWrapper className={active && 'active'} onClick={onClick}>
      <Thumb className={active && 'active'} />
    </ToggleWrapper>
  );
};

ToggleButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const ToggleWrapper = styled.div`
  width: 50px;
  height: 25px;
  padding: 3.5px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 10em;
  display: flex;
  position: relative;
  transition: all 0.3s ease;

  &.active {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;
const Thumb = styled.div`
  position: absolute;
  left: 3.5px;
  width: 18.5px;
  height: 18.5px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 10em;
  transition: all 0.2s ease;

  &.active {
    left: 28px;
  }
`;
export default ToggleButton;
