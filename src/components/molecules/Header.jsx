import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Grid, Text, LeftArrow, RightArrow } from '../atoms';
import { ThemeContext } from 'styled-components';

const Header = (props) => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  return (
    <Grid isFlex height={42}>
      <LeftArrow active={props.leftArrow} />
      <Text color={themeContext.colors.blue} size="14px">
        {props.label}
      </Text>
      <RightArrow active={props.rightArrow} />
    </Grid>
  );
};

Header.propTypes = {
  label: PropTypes.string,
  leftArrow: PropTypes.bool,
  rightArrow: PropTypes.bool,
};

export default Header;
