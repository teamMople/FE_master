import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Wrapper, Grid, Loader } from 'components';

const Loading = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Grid height="100%" center backgroundColor="transparent">
      <Loader type="dot" backgroundColor={themeContext.colors.blue} />
    </Grid>
  );
};

export default Loading;
