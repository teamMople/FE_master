import React, { useContext, useState } from 'react';
import { Grid, Input } from '../atoms';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

const SearchInput = ({ backgroundColor, iconButtonClick, onChange }) => {
  const themeContext = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const handleFocus = () => {
    setActive(true);
  };
  const handleBlur = () => {
    setActive(false);
  };
  return (
    <Grid isFlex>
      <SearchInputWrapper>
        <Input
          fluid
          height="36px"
          placeholder="검색어를 입력해주세요"
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          backgroundColor={backgroundColor}
        />
      </SearchInputWrapper>
      <CustomIconButton onClick={iconButtonClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
            stroke={
              active ? themeContext.colors.darkGray : themeContext.colors.gray
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15L21 21"
            stroke={
              active ? themeContext.colors.darkGray : themeContext.colors.gray
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CustomIconButton>
    </Grid>
  );
};

SearchInput.propTypes = {
  iconButtonClick: PropTypes.func,
  onChange: PropTypes.func,
  backgroundColor: PropTypes.string,
};
const SearchInputWrapper = styled.div`
  width: 100%;
`;
const CustomIconButton = styled.div`
  cursor: pointer;
  margin-left: 10px;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10em;
  transition: all 0.2s ease;
  &:active {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;
export default SearchInput;
