import React, { useContext } from 'react';
import { Text } from '../atoms';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { LiveAnimation } from './index';

const StatusBox = ({
  count,
  label,
  icon,
  gap,
  active,
  text,
  backgroundColor,
  live,
  liveBackgroundColor,
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Box active={active} backgroundColor={backgroundColor}>
      {live && <LiveAnimation backgroundColor={liveBackgroundColor} />}
      {icon && <img src={icon} alt={'icon'} />}
      {label && (
        <Text tiny color={themeContext.colors.darkGray}>
          {label}
        </Text>
      )}
      {count && <Text style={{ marginLeft: gap }}>{count}</Text>}
      {text && <Text style={{ marginLeft: gap }}>{text}</Text>}
    </Box>
  );
};

StatusBox.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.string,
  label: PropTypes.string,
  gap: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  backgroundColor: PropTypes.string,
  live: PropTypes.bool,
  liveBackgroundColor: PropTypes.string,
};

StatusBox.defaultProps = {
  gap: '14px',
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10em;
  min-width: 58px;
  padding: 8px 10px;
  height: 32px;
  background-color: ${({ theme, active, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : active
      ? theme.colors.blue
      : theme.colors.lightGray};
`;

export default StatusBox;
