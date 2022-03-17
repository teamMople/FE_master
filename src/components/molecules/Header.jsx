import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Grid, Text, LeftArrow, RightArrow } from '../atoms';

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <Grid isFlex>
      <LeftArrow
        onClick={() => {
          navigate(-1);
        }}
      />
      <Text color="6E6BF0" size="14px">
        {props.label}
      </Text>
      <RightArrow />
    </Grid>
  );
};

Header.propTypes = {
  label: PropTypes.string,
};

export default Header;
