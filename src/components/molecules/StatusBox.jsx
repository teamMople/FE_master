import React from 'react';
import { Text } from '../atoms';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StatusBox = ({ count, icon, active }) => {
  return (
    <Box active={active}>
      <img src={icon} alt={'icon'} />
      <Text style={{ marginLeft: '14px' }}>{count}</Text>
    </Box>
  );
};

StatusBox.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10em;
  min-width: 58px;
  padding: 8px 10px;
  height: 32px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.blue : theme.colors.lightGray};
`;

export default StatusBox;
