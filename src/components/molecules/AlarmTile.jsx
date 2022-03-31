import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from 'components';

const AlarmTile = (props) => {
  const { board, message } = props;
  const themeContext = useContext(ThemeContext);

  return (
    <Grid width="100%" margin="0px 0px 12px 0px">
      <Grid padding="8px 0px 8px 0px">
        <Text
          small
          lineHeight="18px"
          color={themeContext.colors.black}
          padding="8px 0px 8px 8px"
        >
          [{board}]{message}
        </Text>
      </Grid>
      <Grid margin="0px 0px 8px 0px">
        <Text tiny color={themeContext.colors.gray}>
          3분전
        </Text>
      </Grid>
      <Grid
        width="100%"
        height="1px"
        border="1px solid #000"
        backgroundColor={themeContext.colors.lightGray}
      />
    </Grid>
  );
};

AlarmTile.propTypes = {
  board: PropTypes.string,
  message: PropTypes.string,
};

export default AlarmTile;
