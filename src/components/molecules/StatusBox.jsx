import React, { useContext } from 'react';
import { Text } from '../atoms';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

const StatusBox = ({ count, label, icon, gap, active, text }) => {
  const tnemeContext = useContext(ThemeContext);
  return (
    <Box active={active}>
      {icon && <img src={icon} alt={'icon'} />}
      {label && (
        <Text tiny color={tnemeContext.colors.darkGray}>
          {label}
        </Text>
      )}
      {count && <Text style={{ marginLeft: gap }}>{count}</Text>}
      {text && <Text style={{ marginLeft: gap }}>{text}</Text>}
    </Box>
  );
};

StatusBox.propTypes = {
  count: PropTypes.number | PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  gap: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
};

StatusBox.defaultProps = {
  gap: '14px',
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
