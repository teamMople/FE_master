import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Grid, Loader } from 'components';

const Loading = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Grid height="inherit" center backgroundColor="transparent">
      <Loader type="dot" backgroundColor={themeContext.colors.blue} />
    </Grid>
  );
};

export default Loading;
