import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { Grid, Text, LeftArrow, RightArrow, Button } from '../atoms';
import { ThemeContext } from 'styled-components';

const Header = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div style={{ position: 'relative' }}>
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
      <Button
        width="57px"
        height={30}
        backgroundColor={themeContext.colors.lightGray}
        color={themeContext.colors.blue}
        style={{
          display: props.rightButton ? 'flex' : 'none',
          position: 'absolute',
          top: '0px',
          right: '-8px',
        }}
        onClick={props.rightButtonOnClick}
      >
        {props.rightButtonChildren}
      </Button>
    </div>
  );
};

Header.propTypes = {
  label: PropTypes.string,
  leftArrow: PropTypes.bool,
  leftArrowOnClick: PropTypes.func,
  rightArrow: PropTypes.bool,
  rightArrowOnClick: PropTypes.func,
  rightButton: PropTypes.bool,
  rightButtonOnClick: PropTypes.func,
  rightButtonChildren: PropTypes.any,
};

export default Header;
