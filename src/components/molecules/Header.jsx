import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Grid, Text, LeftArrow, RightArrow } from '../atoms';
import { ThemeContext } from 'styled-components';

const Header = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Grid isFlex height={42}>
      <LeftArrow
        active={props.leftArrow}
        leftArrowOnClick={props.leftArrowOnClick}
      />
      <Text color={themeContext.colors.blue} size="14px">
        {props.label}
      </Text>
      <RightArrow
        active={props.rightArrow}
        rightArrowOnClick={props.rightArrowOnClick}
      />
    </Grid>
  );
};

Header.propTypes = {
  label: PropTypes.string,
  leftArrow: PropTypes.bool,
  leftArrowOnClick: PropTypes.func,
  rightArrow: PropTypes.bool,
  rightArrowOnClick: PropTypes.func,
};

export default Header;
