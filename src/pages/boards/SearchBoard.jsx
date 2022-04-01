import React, { useState, useContext, useCallback, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import lo, { debounce } from 'lodash';
import queryString from 'query-string';

import { Wrapper, Grid, CategoryTile, SearchInput, Loader } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchBoardAsync,
  searchLiveBoardAsync,
  selectedBoardList,
  selectedLiveBoardList,
} from 'modules/boards';
import { Loading } from 'pages';

function SearchBoard(props) {
  const { search } = useLocation();
  const { keyword } = queryString.parse(search);

  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState();
  console.log(searchValue);
  const { data: basicBoardList, status: basicBoardListStatus } =
    useSelector(selectedBoardList);
  const { data: liveBoardList, status: liveBoardListStatus } = useSelector(
    selectedLiveBoardList,
  );

  const debounce = lo.debounce((k) => setSearchValue(k), 1000);
  const keyPress = useCallback(debounce, []);

  const changeSearchInput = (e) => {
    keyPress(e.target.value);
  };

  return (
    <Wrapper
      backgroundColor={themeContext.colors.backgroundGray}
      padding="56px 24px 0px 24px"
    >
      <SearchInput
        backgroundColor={themeContext.colors.backgroundGray}
        onChange={changeSearchInput}
        iconButtonClick={() => {
          navigate('/search/result?keyword=' + searchValue);
        }}
      />
      {!searchValue && (
        <Grid margin="32px 0px 89px 0px">
          <CategoryWrapper>
            {categories.map((cat, index) => {
              return (
                <CategoryTile
                  key={index}
                  category={cat.category}
                  categoryImageUrl={cat.categoryImageUrl}
                  width="148px"
                  height="88px"
                  borderRadius="20px"
                  onClick={() => {
                    navigate('/category/' + cat.category.replace('/', ''));
                  }}
                />
              );
            })}
          </CategoryWrapper>
        </Grid>
      )}
      {searchValue && searchValue !== keyword && <Loading />}
      {searchValue && searchValue === keyword && <Outlet />}
    </Wrapper>
  );
}

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  //flex-wrap: wrap;
  row-gap: 18px;
  column-gap: 18px;
`;

const categories = [
  {
    category: '직장생활',
    categoryImageUrl: '/asset/image/category/office.png',
  },
  {
    category: '학교생활',
    categoryImageUrl: '/asset/image/category/school.png',
  },
  {
    category: '관계/심리',
    categoryImageUrl: '/asset/image/category/relation.png',
  },
  {
    category: '일상생활',
    categoryImageUrl: '/asset/image/category/office.png',
  },
  {
    category: '시사/이슈',
    categoryImageUrl: '/asset/image/category/trends.png',
  },
  {
    category: '기타',
    categoryImageUrl: '/asset/image/category/etc.png',
  },
];

export default SearchBoard;
