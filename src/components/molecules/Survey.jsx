import React, { useContext } from 'react';
import { Grid, Text, Check } from 'components';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

const Survey = ({ label, onClick, checked }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Grid isFlex margin="0px 0px 16px 0px">
      <Grid width="10%">
        <Check checked={checked} onClick={onClick} />
      </Grid>
      <Grid width="90%">
        <Text
          size="12px"
          lineHeight="18px"
          color={themeContext.colors.darkGray}
        >
          {label}
        </Text>
        <Grid
          width="100%"
          height="1px"
          backgroundColor={themeContext.colors.lightGray}
          margin="10px 0px 0px 0px"
        />
      </Grid>
    </Grid>
  );
};
Survey.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};

export default Survey;
