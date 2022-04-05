import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Text, LeftArrow, RightArrow, Button } from '../atoms';
import { css, ThemeContext } from 'styled-components';
import styled from 'styled-components';

const Header = ({
  fixedTop,
  rightButtonRender,
  leftArrow,
  leftArrowOnClick,
  label,
  rightArrow,
  rightArrowOnClick,
  disabled,
  style,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <HeaderWrapper fixedTop={fixedTop} style={style}>
      <Grid isFlex height={`${themeContext.style.header.height}`}>
        <LeftArrow active={leftArrow} leftArrowOnClick={leftArrowOnClick} />
        <Text center color={themeContext.colors.blue}>
          {label}
        </Text>
        <RightArrow active={rightArrow} rightArrowOnClick={rightArrowOnClick} />
      </Grid>
      {rightButtonRender && (
        <Button
          shape={'rounded'}
          size={'small'}
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: 0,
            minWidth: 'auto',
          }}
          disabled={disabled}
          onClick={rightButtonRender.onClickButton}
        >
          {rightButtonRender.label}
        </Button>
      )}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  fixedTop: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  leftArrow: PropTypes.bool,
  leftArrowOnClick: PropTypes.func,
  rightArrow: PropTypes.bool,
  rightArrowOnClick: PropTypes.func,
  rightButtonRender: PropTypes.shape({
    label: PropTypes.string,
    onClickButton: PropTypes.func,
  }),
  style: PropTypes.any,
};

const HeaderWrapper = styled.div`
  position: relative;
  ${({ fixedTop }) =>
    fixedTop &&
    css`
      position: fixed;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.white};
      padding: 0 24px;
      z-index: 10;
    `};
`;

export default Header;
