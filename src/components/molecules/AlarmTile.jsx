import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from 'components';

const AlarmTile = (props) => {
  const { author, message } = props;
  const themeContext = useContext(ThemeContext);

  return (
    <Grid width="100%" margin="0px 0px 20px 0px">
      <Grid padding="8px 0px 8px 0px">
        <Text size="12px" lineHeight="18px" color={themeContext.colors.black}>
          {author}님이 {message}
        </Text>
      </Grid>
      <Grid
        width="100%"
        height="1px"
        border="1px solid #000"
        backgroundColor={themeContext.colors.black}
      />
    </Grid>
  );
};

AlarmTile.propTypes = {
  author: PropTypes.string,
  message: PropTypes.string,
};

export default AlarmTile;
